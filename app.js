// 환경 변수 설정
import dotenv from 'dotenv';

// 디스코드 관련
import discord, { Collection, GatewayIntentBits } from 'discord.js';
import { updateGuildUsers } from './src/utils/getGuildUser.js';

// 서버 관련
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

// DB 연결
import { connectToDatabase } from './src/db/connection.js';

// 라우터
import dbRouter from './src/routers/db.router.js';
import esiRouter from './src/routers/esi.router.js';
import gitRouter from './src/routers/git.router.js';

// 미들웨어
import { sessionConfig } from './src/middlewares/session.js';

// 유틸리티 함수들
import { createC5RattingPool } from './src/db/connectC5ratting.js';
import downTimeTracker from './src/downTimeTimer.js';
import { checkStructureFuelPerDay } from './src/esi/checkStructureFuelPerDay.js';
import { reinforceAlert } from './src/esi/reinforceAlert.js';
import { sendDmToSubscriber } from './src/service/sendDmServing.js';
import commandHandler from './src/utils/commandHandler.js';
import { setClientInstance } from './src/utils/discordClientManger.js';
import getServerStatus from './src/utils/getServerStatus.js';
import guildCheck from './src/utils/guildCheck.js';
import { handleC5Ratting } from './src/utils/handleC5Ratting.js';
import handleModalSubmit from './src/utils/handleModalSubmit.js';
import serverStartNotification from './src/utils/serverStartNotification.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

let version;
const startTime = Date.now();
const app = express();
const client = new discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});
//커맨드를 담을 컬렉션
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
app.use('/db', dbRouter);
//--------

app.listen(process.env.WEB_PORT, () => {
  console.log('웹 서버 구동 중');
});

await commandHandler(client.commands, __dirname);

client.once('ready', async () => {
  console.log(`서버 온라인 ${client.user.tag}!`);
  const serverStatus = await getServerStatus();
  version = serverStatus.server_version;
  console.log(`version을 ${version}으로 설정했습니다.`);
  await connectToDatabase();
  await createC5RattingPool();
  setClientInstance(client); //클라이언트 객체를 다른 곳에서 쓸 수 있도록 별도로 저장해둠
  await updateGuildUsers();
  downTimeTracker(version);
  await serverStartNotification(startTime);
  reinforceAlert();
  checkStructureFuelPerDay();
});

// 이벤트 핸들러가 길어져서, 이벤트 핸들러를 따로 뺄 필요가 있어보임.

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
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
        await interaction.followUp({
          content: '명령어 실행중 오류가 발생했습니다',
          flags: InteractionResponseFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: '명령어 실행중 오류가 발생했습니다',
          flags: InteractionResponseFlags.Ephemeral,
        });
      }
    }
    // modal이 제출되었을때에 대한 이벤트 핸들러.
  } else if (interaction.isModalSubmit()) {
    console.log('모달 제출 발생', interaction.customId);
    // 이벤트 처리 함수
    await handleModalSubmit(interaction);
    return;
  } else if (interaction.isButton()) {
    await handleC5Ratting(interaction);
  }
});

client.on('messageCreate', async message => {
  if (!message.mentions.everyone) return;

  if (message.content.includes('@everyone')) {
    console.log(`[${message.author.tag}] @everyone 핑 사용:`, message.content);
    await sendDmToSubscriber('everyone', message);
  } else if (message.content.includes('@here')) {
    console.log(`[${message.author.tag}] @here 핑 사용:`, message.content);
    await sendDmToSubscriber('here', message);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
