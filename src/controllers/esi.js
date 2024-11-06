//회원가입
import express from 'express';
import dotenv from 'dotenv';
import scopes from '../scope.js';
import crypto from 'crypto';
import { decodeJwtToken } from '../utils/jwt.decode.js';
dotenv.config();

const clientId = process.env.ESI_CLIENT_ID;
const redirectUrl = encodeURIComponent(process.env.ESI_CALLBACK_URL);
const clientSecret = process.env.ESI_SECRET_KEY;

const generateState = () => {
  return crypto.randomBytes(16).toString('hex');
};

export const signUp = async (req, res) => {
  const state = generateState();
  req.session.state = state;
  const authUrl = `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${redirectUrl}&client_id=${clientId}&scope=${scopes}&state=${state}`;

  res.redirect(authUrl);
};

export const callback = async (req, res) => {
  const { code, state } = req.query;
  if (state !== req.session.state) {
    return res.status(400).send('state 파라미터 오류');
  }
  // 추후 로깅이나 DB저장 해야함 단 이 시점에서 이 code가 누구 소유인지 모름;;
  res.send(`Authorization code: ${code}`);
  const userData = await getAccessToken(code);
  const userName = decodeJwtToken(userData.access_token);
  console.log('가입한 유저 이름', userName);
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
    return { access_token, refresh_token };
  } catch (error) {
    console.error('AccessToken 함수에서 에러 발생', error);
  }
};
