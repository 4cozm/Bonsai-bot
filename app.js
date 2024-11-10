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
import esiRouter from './src/routers/esi.router.js';
import { sessionConfig } from './src/middlewares/session.js';
import guildCheck from './src/utils/guildCheck.js';
import commandHandler from './src/utils/commandHandler.js';

import gitRouter from './src/routers/git.router.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

let version;
const app = express();
const client = new discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
client.commands = new Collection();

//미들웨어
app.use(express.json());
app.use(session(sessionConfig));
//--------

//정적 파일 호스팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
//----------

//라우터 관련
app.use('/esi', esiRouter);
app.use('/git', gitRouter);
//--------

app.listen(process.env.WEB_PORT, () => {
  console.log('웹 서버 구동 중');
});

await commandHandler(client.commands, __dirname);

client.on('ready', async () => {
  console.log(`서버 온라인 ${client.user.tag}!`);
  const serverStatus = await getServerStatus();
  version = serverStatus.server_version;
  console.log(`version을 ${version}으로 설정했습니다.`);
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
    await guildCheck(interaction.guild);
    await command.execute(interaction);
  } catch (error) {
    console.error('명령어 실행 중 에러 발생:', error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: '명령어 실행중 오류가 발생했습니다', ephemeral: true });
    } else {
      await interaction.reply({ content: '명령어 실행중 오류가 발생했습니다', ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
