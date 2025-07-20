// db/queries/getDmSubStatusByDiscordId.js
import { discordAlert } from '../../utils/discordAlert.js';
import { SqlGetDmSubStatusByDiscordId } from '../sql/sql.js';
import { getConnection } from './connection.js';

/**
 * 특정 디스코드 ID의 DM 구독 상태를 조회합니다.
 * @param {string} discord_id - 디스코드 사용자 ID
 * @returns {boolean|null} 구독 상태 (true/false) 또는 존재하지 않으면 null
 */
export const getDmSubStatusByDiscordId = async discord_id => {
  const db = await getConnection();

  try {
    const [rows] = await db.execute(SqlGetDmSubStatusByDiscordId, [discord_id]);

    if (rows.length > 0) {
      return !!rows[0].sub; // DB에서 null이 나올 가능성은 없지만 안전하게 boolean 처리
    } else {
      return null; // 존재하지 않음
    }
  } catch (error) {
    await discordAlert('404', 'DM 구독 상태 조회 실패: ' + error);
    throw error;
  }
};
