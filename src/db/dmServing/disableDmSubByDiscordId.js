import { discordAlert } from '../../utils/discordAlert.js';
import { getConnection } from '../connection.js';
import { SqlDisableDmSubByDiscordId } from '../sql/sql.js';
/**
 * 디스코드 ID로 DM 구독을 비활성화합니다.
 * @param {string} discord_id - 디스코드 사용자 ID
 * @returns {bool} 쿼리 성공 여부
 */
export const disableDmSubByDiscordId = async discord_id => {
  const db = await getConnection();

  try {
    const [result] = await db.execute(SqlDisableDmSubByDiscordId, [discord_id]);
    return result.affectedRows > 0;
  } catch (error) {
    await discordAlert('404', 'DM 구독 비활성화 실패:' + error);
    throw error;
  }
};
