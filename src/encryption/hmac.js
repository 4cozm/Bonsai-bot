//API 통신시 검증/암호화 하는 함수들의 모임

import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const generateHMAC = message => {
  return crypto.createHmac('sha256', process.env.API_SECRET_KEY).update(message).digest('hex');
};

export const verifyHMAC = (receiveMessage, receivedHMAC) => {
  const computedHMAC = generateHMAC(receiveMessage); // 수신한 메세지를 HMAC으로 생성
  return computedHMAC === receivedHMAC; //요청의 HMAC과 비교
};
