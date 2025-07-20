import dotenv from 'dotenv';

import { disableDmSubByDiscordId } from '../db/dmServing/disableDmSubByDiscordId.js';
import { getAllDmSubscribe } from '../db/dmServing/getAllDmSubscribe.js';
import { getClientInstance } from '../utils/discordClientManger.js';

dotenv.config();
/**
 * 서버 시작 시 DM 구독자 정보를 기반으로 멤버 캐싱
 */
export const preloadDmSubscribers = async () => {
  const client = getClientInstance();
  const guild = await client.guilds.fetch(process.env.GUILDS_NUMBER);

  const dmSubscribers = await getAllDmSubscribe();
  const failedUsers = [];

  for (const userId of dmSubscribers) {
    try {
      await guild.members.fetch(userId); // 이 시점에 캐싱됨
    } catch (err) {
      console.warn(`⚠️ 서버에 존재하지 않는 유저: ${userId}, 구독 해제 처리`);
      await disableDmSubByDiscordId(userId);
      failedUsers.push(userId);
    }
  }

  console.log(`DM 구독자 캐싱 완료. 총 ${dmSubscribers.length - failedUsers.length}명. 실패: ${failedUsers.length}명`);
};
