//회원가입
import dotenv from 'dotenv';
import scopes from '../scope.js';
import { decodeJwtToken } from '../utils/jwt.decode.js';
import addUserToDatabase from '../db/addUserToDatabase.js';
import { checkState, getMessageChannelByState, getMessageInstanceByState } from '../esi/stateManager.js';
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
  const messageInstance = getMessageInstanceByState(state);
  const channelId = getMessageChannelByState(state);

  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=discord://discord.com/channels/968306218852565052/${channelId}/${messageInstance.id}">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: #333;
          }
          .message-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 80%;
            max-width: 400px;
            text-align: center;
            font-size: 16px;
          }
          h2 {
            color: #5f6368;
            font-size: 24px;
            margin-bottom: 15px;
          }
          p {
            margin-bottom: 20px;
            line-height: 1.5;
          }
          .loading {
            font-weight: bold;
            color: #007bff;
          }
          .redirecting {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
          }
          .redirecting a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="message-container">
          <h2>리디렉션 중입니다...</h2>
          <p class="loading">잠시만 기다려 주세요, 디스코드 채널로 이동합니다.</p>
        </div>
      </body>
    </html>
  `);
  

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
