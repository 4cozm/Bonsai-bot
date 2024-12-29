//회원가입
import dotenv from 'dotenv';
import scopes from '../scope.js';
import { decodeJwtToken } from '../utils/jwt.decode.js';
import addUserToDatabase from '../db/addUserToDatabase.js';
import { checkState, getMessageIdByState } from '../esi/stateManager.js';
dotenv.config();

const clientId = process.env.ESI_CLIENT_ID;
const redirectUrl = encodeURIComponent(process.env.ESI_CALLBACK_URL);
const clientSecret = process.env.ESI_SECRET_KEY;

export const signUp = async (req, res) => {
  const state = req.query.state;
  if (!state) {
    res.send('discord에서 실행해 주세요');
    return;
  }
  const authUrl = `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${redirectUrl}&client_id=${clientId}&scope=${scopes}&state=${state}`;
  res.redirect(authUrl);
};

export const callback = async (req, res) => {
  const { code, state } = req.query;
  const stateVerify = checkState(state);
  if (!stateVerify) {
    res.send('만료된 인증 번호 입니다.명령어를 다시 실행한 뒤 접근해주세요');
    return;
  }
  const { messageId, channelId } = getMessageIdByState(state);
  res.redirect(`discord://discord.com/channels/968306218852565052/${channelId}/${messageId.id}`); //messageId는 메세지의 인스턴스가 저장되어 있음
  const userToken = await getAccessToken(code);
  const userData = decodeJwtToken(userToken.access_token);
  addUserToDatabase(userToken, userData, state);
};

const getAccessToken = async code => {
  const tokenUrl = 'https://login.eveonline.com/v2/oauth/token/';

  const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_url: redirectUrl,
  });

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error('토큰을 가져오는데 실패 했습니다', response.statusText);
    }

    const responseData = await response.json();
    const { access_token, refresh_token, expires_in } = responseData;
    return { access_token, refresh_token, expires_in };
  } catch (error) {
    console.error('AccessToken 함수에서 에러 발생', error);
  }
};
