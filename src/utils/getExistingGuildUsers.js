//실제 서버에 남아있는지 확인하는 함수입니다
//현재는 DM 서빙을 구독했지만, 서버에서 강퇴 당하거나 나간 유저를 제거하기 위한 기능에서 사용합니다.
import dotenv from 'dotenv';
import { disableDmSubByDiscordId } from '../db/dmServing/disableDmSubByDiscordId.js';
import { discordAlert } from './discordAlert.js';
dotenv.config();

/**
 * 주어진 유저 ID 목록 중 현재 서버(Guild)에 존재하는 유저 ID만 반환합니다.
 * 서버에 존재하지 않는 유저는 자동으로 DM 구독을 비활성화합니다.
 *
 * @param {string[]} userList - Discord ID 목록
 * @param {Client} client - Discord.js 클라이언트 인스턴스
 * @param {string} guildId - 서버 ID (기본값: 환경변수 GUILDS_NUMBER)
 * @returns {Promise<string[]>} 서버에 존재하는 유저 ID 목록
 */
export const getExistingGuildUsers = async (userList, client, guildId = process.env.GUILDS_NUMBER) => {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error('❌ Guild를 찾을 수 없습니다: 현재 세팅값', process.env.GUILDS_NUMBER);
    await discordAlert('404', 'getExistingGuildUsers에서 길드 값을 찾지 못했습니다');
    return [];
  }

  const validUserList = [];

  for (const userId of userList) {
    if (guild.members.cache.has(userId)) {
      validUserList.push(userId);
    } else {
      console.log(`🚫 서버에서 제거된 유저: ${userId} → 구독 비활성화`);
      try {
        await disableDmSubByDiscordId(userId);
      } catch (err) {
        console.warn(`❗ 구독 비활성화 실패 (${userId}): ${err.message}`);
        await discordAlert(
          '404',
          `알림 DM 서빙중 - 서버에서 나간 유저의 구독 비활성화 처리중 문제 발생(${userId}): ${err.message}`
        );
      }
    }
  }

  return validUserList;
};
