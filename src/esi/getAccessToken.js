import reissueAccessToken from './reissueAccessToken.js';
import { getAccessTokenList } from './tokenManager.js';
import getCustomError from '../errors/index.js';

const { unAuthorizedError } = await getCustomError();
/**
 * 인게임 값으로 엑세스 토큰을 가져옴.
 * 토큰이 없거나 만료된 경우 자동으로 새로운 토큰을 발급받은 뒤 반환함
 * @param {Number} discordId - 요청자의 디스코드 ID
 * @param {String} name - 인게임 유저 닉네임
 */
const getAccessToken = async (discordId, name) => {
  try {
    const tokenList = getAccessTokenList();
    if (name in tokenList) {
      const data = tokenList[name];
      if (data.discordId != discordId) {
        throw new unAuthorizedError(null, `본인 계정이 아님에도 접근함 discord ID:${discordId},character:${name}`);
      }
      if (Date.now() - data.expireIn > 0) {
        //토큰의 만료 기한이 지났으므로 재발급 절차 진행
        const accessToken = await reissueAccessToken(discordId, name);
        return accessToken;
      }
      return data.accessToken;
    } else {
      //엑세스 토큰이 존재하지 않기에 재발급 진행
      console.log('재발급 진행');
      const accessToken = await reissueAccessToken(discordId, name);
      return accessToken;
    }
  } catch (error) {
    console.error(error);
  }
};

export default getAccessToken;
