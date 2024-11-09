import dotenv from 'dotenv';
import discord from 'discord.js';
import { GatewayIntentBits } from 'discord.js';
import { Collection } from 'discord.js';
import downTimeTracker from './src/downTimeTimer.js';
import getServerStatus from './src/utils/getServerStatus.js';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import esiRouter from './src/routers/ESI.router.js';
import { sessionConfig  } from './src/middlewares/session.js';
import guildCheck from './src/utils/guildCheck.js';
import commandHandler from './src/utils/commandHandler.js';
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

commandHandler(client.commands, __dirname);

let version;

client.on('ready', async () => {
  console.log(`서버 온라인 ${client.user.tag}!`);
  await getServerStatus().then(serverStatus => {
    version = serverStatus.server_version;
    console.log(`version을 ${version}으로 설정했습니다.`);
  });
  downTimeTracker();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
    	// DM으로 명령어를 쓰게 될 경우 수정이 필요함.
		const guildError = await guildCheck(interaction.guild);
		if(guildError){
			console.error (guildError);
			return;
		}
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
