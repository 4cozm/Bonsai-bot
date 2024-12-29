//discord아이디를 입력하면 해당 아이디와 매치된 모든 계정의 캐릭터 이름을 불러옴

import { searchCharacters } from './sql/sql.js';
import { getConnection } from './connection.js';
const DbConnection = await getConnection();

/**
 * 디스코드 ID를 기반으로 캣포유 ESI에 등록된 모든 캐릭터의 이름을 맵 구조로 반환
 * @param {*} discordId
 */
export const getCharacterNameByDiscordId = async discordId => {
  const [rows] = await DbConnection.execute(searchCharacters, [discordId]);
  return rows.map(row => row.name);
};
