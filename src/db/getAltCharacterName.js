import { getConnection } from './connection.js';
import { getDiscordIdByCharacterId, getAltCharacterNameByDiscordId } from './sql/sql.js';
import getCustomError from '../errors/index.js';

const { dataNotFoundError } = await getCustomError();
/**
 * 이브온라인 캐릭터 ID를 전달하면 소유주가 같은 모든 계정의 ID값을 배열로 반환
 * @param {String} characterId
 * @return {Array}
 */
export const getAltCharacterName = async characterId => {
  try {
    const db = await getConnection();
    const [[ownerDiscordId]] = await db.execute(getDiscordIdByCharacterId, [characterId]);
    if (!ownerDiscordId) {
      throw dataNotFoundError('getAltCharacterName:Discord ID를 찾을 수 없습니다.');
    }

    const [altList] = await db.execute(getAltCharacterNameByDiscordId, [ownerDiscordId.discord]);
    const characterIds = altList.map(item => item.characterId);
    console.log(characterIds);
    return characterIds;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default getAltCharacterName;
