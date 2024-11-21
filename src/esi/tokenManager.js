//인메모리 구조의 토큰 저장소
const accessTokenList = {};

/**
 * 인메모리 구조의 토큰 저장소를 반환
 */
export const getAccessTokenList = () => {
  return accessTokenList;
};

export const addAccessTokenList = (inGameId, data) => {
  const { access_token } = data;
  accessTokenList[inGameId] = {
    accessToken: access_token,
    expireIn: Date.now() + 20 * 60 * 1000, // 만료 시간은 20분
  };
};
