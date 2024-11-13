import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

// REST 모듈의 인스턴스 생성
const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

// command deploy 함수
(async () => {
  try {
    console.log(`Started deleting application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.GUILDS_NUMBER),
      { body: [] }
    );

    console.log(`Successfully deleted application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
