//리인포스 여부를 주기적으로 확인
import dotenv from 'dotenv';
import getAccessToken from './getAccessToken.js';
import cron from 'node-cron';
import getCustomError from '../errors/index.js';
import { discordAlert } from '../utils/discordAlert.js';
const { esiRequestError, validationError } = await getCustomError();
dotenv.config();

export const reinforceAlert = () => {
  console.log('POS 리인포스 알림 등록 완료');
  let maxNotificationId = 0;
  let processedCount = 0;
  cron.schedule('* * * * *', async () => {
    const accessToken = await getAccessToken(process.env.STRUCTURE_OWNER_DISCORD_ID, 'fe in');
    const alertAccountId = process.env.CATALIST_TOWER_CEO_ID;
    try {
      if (!accessToken || !alertAccountId) {
        throw new validationError(
          null,
          `리인포스 정보 요청시 필요한 필드가 누락 되었습니다 \n 처리에 필요한 앵커콥 ID ${alertAccountId.slice(0, 4)} \n 엑세스 토큰${accessToken.slice(0, 20)}` //보안을 위해 토큰은 20자리만 출력
        );
      }
      const response = await fetch(`https://esi.evetech.net/latest/characters/${alertAccountId}/notifications/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error(response);
        throw new esiRequestError(
          response.status,
          `앵커꼽의 notification을 가져오는데 실패했습니다 \n reinforceAlert 에러 텍스트 ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log(data);

      data.forEach(notification => {
        const notificationId = notification.notification_id;

        //최대 ID보다 작은 경우 이미 처리된 ID들임
        if (notificationId <= maxNotificationId) {
          if (processedCount >= 2) {
            return;
          } else {
            processedCount++;
          }
        }

        if (notification.type === 'TowerAlertMsg' || notification.type === 'StructureUnderAttack') {
          discordAlert(968306219234238529n, 'POS리인포스');
        }

        // 최대 ID 업데이트
        if (notificationId > maxNotificationId) {
          maxNotificationId = notificationId;
        }
      });
    } catch (error) {
      console.error('reinforceAlert에서 에러 밣생:', error);
    }
    processedCount = 0;
  });
};
