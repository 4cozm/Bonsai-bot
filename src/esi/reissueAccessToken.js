//리프레시 토큰으로 엑세스 토큰을 발급 받는 처리 과정
import { addAccessTokenList } from './tokenManager.js';
import dotenv from 'dotenv';
import getRefreshToken from './getRefreshToken.js';
dotenv.config();

const authString = btoa(`${process.env.ESI_CLIENT_ID}:${process.env.ESI_SECRET_KEY}`);
/**
 * access 토큰을 재발급 받는 함수

 * 동시에 DB에 접근해 해당 유저의 expireTime을 업데이트 함
 * @param {Number} discordId - 요청자의 디스코드 ID
 * @param {string} name - 인게임 이름
 * @returns {Promise/string} 엑세스 토큰
 */
const reissueAccessToken = async (discordId, inGameName) => {
  try {
    const refreshToken = await getRefreshToken(discordId, inGameName);
    const response = await fetch('https://login.eveonline.com/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authString}`,
      },
      body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
    });

    const data = await response.json();

    addAccessTokenList(inGameName, discordId, data); // 인메모리에 정보 저장

    return data.access_token; // 엑세스 토큰 반환
  } catch (error) {
    console.error('Error:', error);
  }
};

export default reissueAccessToken;
