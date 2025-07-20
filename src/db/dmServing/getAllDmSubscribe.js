// db/queries/getAllDmSubscribe.js
import { discordAlert } from '../../utils/discordAlert.js';
import { SqlGetAllDmSubscribe } from '../sql/sql.js';
import { getConnection } from './connection.js';

/**
 * 구독 상태가 true인 모든 유저의 discord_id를 조회합니다.
 * @returns {string[]} 구독 중인 디스코드 ID 목록
 */
export const getAllDmSubscribe = async () => {
  const db = await getConnection();

  try {
    const [rows] = await db.execute(SqlGetAllDmSubscribe);
    return rows.map(row => row.discord_id);
  } catch (error) {
    await discordAlert('404', 'DM 구독자 전체 조회 실패: ' + error);
    throw error;
  }
};
