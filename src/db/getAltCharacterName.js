import dotenv from 'dotenv';
import { getConnection } from './connection.js';
import { getDiscordIdByCharacterId, getAltCharacterNameByDiscordId } from './sql/sql.js';
import getCustomError from '../errors/index.js';

const { dataNotFoundError } = await getCustomError();
dotenv.config();
/**
 * 이브온라인 캐릭터 ID를 전달하면 소유주가 같은 모든 계정의 ID값을 배열로 반환
 * @param {Number} characterId
 * @return {Array}
 */
export const getAltCharacterName = async characterId => {
  try {
    const db = await getConnection();
    const ownerDiscordId = await db.execute(getDiscordIdByCharacterId(characterId));
    if (!ownerDiscordId || ownerDiscordIdResult.length === 0) {
      //DB에 등록이 안되어 있는 경우 값을 찾을 수 없음
      throw dataNotFoundError(ownerDiscordId);
    }
    const altList = await db.execute(getAltCharacterNameByDiscordId(ownerDiscordId[0]));
    return altList;
  } catch (e) {
    console.error(e);
  }
};
