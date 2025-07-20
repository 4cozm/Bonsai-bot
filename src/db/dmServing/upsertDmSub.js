// db/queries/upsertDmSub.js
import { discordAlert } from '../../utils/discordAlert.js';
import { SqlUpsertDmSub } from '../sql/sql.js';
import { getConnection } from './connection.js';

/**
 * 구독 상태를 삽입하거나, 이미 존재하면 해당 구독 상태로 갱신합니다.
 * @param {string} discord_id - 디스코드 사용자 ID
 * @param {boolean} sub - 변경하려는 구독 상태 (true or false) 기본은 true로 설정됨
 * @returns {boolean} 성공 여부
 */
export const upsertDmSub = async (discord_id, sub = true) => {
  const db = await getConnection();

  try {
    const [result] = await db.execute(SqlUpsertDmSub, [discord_id, sub]);
    return result.affectedRows > 0;
  } catch (error) {
    await discordAlert('404', `DM 구독 정보 업서트 실패: ${error}`);
    throw error;
  }
};
