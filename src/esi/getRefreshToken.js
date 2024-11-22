import { getConnection } from '../db/connection.js';
import { getRefreshToken as refreshTokenSQL, accessDeniedRequestRefreshToken } from '../db/sql/sql.js';
import getCustomError from '../errors/index.js';

const { unAuthorizedError } = await getCustomError();

/**
 * 인게임 이름을 전달하면 refreshToken을 반환하는 함수
 * @param {String} inGameName
 */
const getRefreshToken = async (discordId, inGameName) => {
  const pool = await getConnection();
  const [rows] = await pool.execute(refreshTokenSQL, [inGameName, discordId]);
  if (rows.length > 0) {
    return rows[0].refreshToken;
  } else {
    const [rows] = await pool.execute(accessDeniedRequestRefreshToken, [inGameName]);
    if (rows.length > 0) {
      //본인에게 등록된 계정이 아님에도,요청을 보낸경우
      throw new unAuthorizedError(
        rows[0],
        `본인 계정이 아님에도 접근함 discord ID:${discordId},character:${inGameName} `
      );
    }
    //ESI 등록을 요청하는 메세지를 답변으로 제공
    return null;
  }
};

export default getRefreshToken;
