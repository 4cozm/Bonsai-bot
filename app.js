import dotenv from 'dotenv';
import discord from 'discord.js';
import { GatewayIntentBits } from 'discord.js';
import { Collection } from 'discord.js';
import downTimeTracker from './src/downTimeTimer.js';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import esiRouter from './src/routers/ESI.router.js';
import { sessionConfig  } from './src/middlewares/session.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(session(sessionConfig));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/esi', esiRouter);

app.listen(process.env.WEB_PORT, () => {
  console.log('웹 서버 구동 중');
});

dotenv.config();

const client = new discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();

const commandFoldersPath = path.join(__dirname, 'src', 'commands');
const commandFolders = fs.readdirSync(commandFoldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(commandFoldersPath, folder);
  const commandsURL = pathToFileURL(commandsPath); 
	const commandFiles = fs.readdirSync(commandsURL).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
    const fileURL = pathToFileURL(filePath);
		const command = await import(fileURL);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on('ready', () => {
  console.log(`서버 온라인 ${client.user.tag}!`);
  downTimeTracker();
});

client.on('messageCreate', async msg => {
  try {
    if (msg.author.bot) return;
    console.log(`메세지: ${msg.content}`);
    //여기 아래에 필터링 할 단어나 조건을 작성하면 됩니다
  } catch (error) {
    console.error({ 에러: error.message });
  }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
