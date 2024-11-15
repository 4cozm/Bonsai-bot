import dotenv from 'dotenv';
dotenv.config();

const serverStartNotification = async startTime => {
  const time = Date.now() - startTime;
  let message = { content: `서버가 재시작 되었습니다! 재부팅에 소요된 시간: ${time}ms` };
  if (process.env.SERVER_START_ANNOUNCEMENT !== 'true') {
    return; //AWS에만 해당 env 속성이 있음
  }
  try {
    await fetch(process.env.DISCORD_404_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Webhook 전송 실패:', error);
  }
};

export default serverStartNotification;
