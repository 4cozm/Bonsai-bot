import reissueAccessToken from './reissueAccessToken.js';
import { getAccessTokenList } from './tokenManager.js';

/**
 * 인게임 값으로 엑세스 토큰을 가져옴.
 * 토큰이 없거나 만료된 경우 자동으로 새로운 토큰을 발급받은 뒤 반환함
 * @param {String} name - 인게임 유저 닉네
 */
const getAccessToken = async name => {
  const tokenList = getAccessTokenList();
  if (name in tokenList) {
    const data = tokenList[name];
    if (Date.now() - data.expireIn > 0) {
      //토큰의 만료 기한이 지났으므로 재발급 절차 진행
      const accessToken = await reissueAccessToken(name);
      return accessToken;
    }
    return data.accessToken;
  } else {
    //엑세스 토큰이 존재하지 않기에 재발급 진행
    const accessToken = await reissueAccessToken(name);
    return accessToken;
  }
};

export default getAccessToken;
