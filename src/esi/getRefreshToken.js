import { getConnection } from '../db/connection.js';
import { getRefreshToken as refreshTokenSQL } from '../db/sql/sql.js';

/**
 * 인게임 이름을 전달하면 refreshToken을 반환하는 함수
 * @param {String} inGameName
 */
const getRefreshToken = async inGameName => {
  const pool = await getConnection();
  const [rows] = await pool.execute(refreshTokenSQL, [inGameName]);
  if (rows.length > 0) {
    return rows[0].refreshToken;
  } else {
    console.log(`Name "${inGameName}"에 해당하는 refreshToken을 찾을 수 없습니다.`);
    //ESI 등록을 요청하는 메세지를 답변으로 제공
    return null;
  }
};

export default getRefreshToken;
