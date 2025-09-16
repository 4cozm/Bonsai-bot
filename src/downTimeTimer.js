import dotenv from 'dotenv';
import cron from 'node-cron';
import { alertSkillPoint } from './utils/alertSkillPoint.js';
import getServerStatus from './utils/getServerStatus.js';

dotenv.config();

let vipMessageSent = false;

async function sendDiscordMessage(content) {
  const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    throw new Error(`Webhook 전송 실패: ${response.status} ${response.statusText}`);
  }
}

const downTimeTracker = (version) => {
  console.log('DT 타이머 등록완료');

  cron.schedule('0 11 * * *', async () => {
    console.log('DT 타이머 실행');
    vipMessageSent = false;

    const interval = setInterval(async () => {
      try {
        const serverStatus = await getServerStatus();
        const startTime = new Date(serverStatus.start_time);
        const currentTime = new Date(Date.now());

        const currentDate = currentTime.getDate();
        const startTimeDate = startTime.getDate();

        const vipStatus = serverStatus.vip ?? false;

        if (currentDate === startTimeDate) {
          if (vipStatus === true && vipMessageSent === false) {
            let content = '서버가 오픈되었지만, 현재는 개발자만 접근 가능합니다';
            if (version && version < serverStatus.server_version) {
              content += ` (버전이 ${serverStatus.server_version}으로 업데이트됨)`;
              version = serverStatus.server_version;
            }
            await sendDiscordMessage(content);
            vipMessageSent = true;
          }

          if (vipStatus === false) {
            if (!version) {
              await sendDiscordMessage(
                `서버 접속가능 , 서버 버전을 확인 할 수 없습니다. ${serverStatus.server_version} 버전을 최신 버전으로 설정했습니다.`
              );
              version = serverStatus.server_version;
            } else if (version < serverStatus.server_version) {
              await sendDiscordMessage(
                '서버 접속가능, 버전이 업데이트되었습니다. 미꾸라지 유저는 주의해주세요'
              );
              version = serverStatus.server_version;
            } else {
              await sendDiscordMessage('서버 접속가능');
            }

            await alertSkillPoint();
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, 30000);
  });
};

export default downTimeTracker;
