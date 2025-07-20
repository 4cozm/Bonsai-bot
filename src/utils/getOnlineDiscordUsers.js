import dotenv from 'dotenv';
import { discordAlert } from './discordAlert.js';
import { getClientInstance } from './discordClientManger.js';
dotenv.config();

/**
 * 주어진 유저 리스트 중 온라인 상태인 디스코드 ID만 반환합니다.
 * 단 캐싱되지 않은 유저 (오랫동안 채팅을 치지 않은 유저)는 자동으로 제외됨
 * @param {string[]} userList - 디스코드 유저 ID 배열
 * @param {Client} client - Discord Client 객체
 * @returns {Promise<string[]>} 온라인 상태인 유저 ID 배열
 */
export const getOnlineDiscordUsers = async userList => {
  const discordClientInstance = getClientInstance();
  const guild = discordClientInstance.guilds.cache.get(process.env.GUILDS_NUMBER);
  if (!guild) {
    await discordAlert('404', '온라인 유저 수집중 오류 - Guild를 찾을 수 없습니다.');
    return;
  }
  const results = [];

  for (const userId of userList) {
    try {
      const member = await guild.members.fetch(userId);
      if (!member) continue;

      const status = member.presence?.status;

      if (status === 'online') {
        results.push(userId);
      }
    } catch (err) {
      console.error(`DM 전송 실패 (${userId}):`, err.message);
      await discordAlert('404', `DM 발송중 Presence 확인 실패 (${userId}): ${err.message}`);
    }
  }

  return results;
};
