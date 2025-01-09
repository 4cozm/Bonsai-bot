//리인포스 여부를 주기적으로 확인
import dotenv from 'dotenv';
import getAccessToken from './getAccessToken.js';
import cron from 'node-cron';
import getCustomError from '../errors/index.js';
import { discordAlert } from '../utils/discordAlert.js';
const { esiRequestError, validationError } = await getCustomError();
dotenv.config();

let firstRun = true; //서버 재시작시 이전에 있었던 알림 리스트로 인해서 불필요한 알림이 가지 않도록 하는 장치
const ignoreList = [
  //공격시 무시할 리스트
  'Blood Raiders',
  'Guristas Pirates',
  'Serpentis',
  "Sansha's Nation",
  'Angel Cartel',
  'Rogue Drones',
];

export const reinforceAlert = () => {
  console.log('POS 리인포스 알림 등록 완료');
  let maxNotificationId = 0;
  cron.schedule('5 * * * *', async () => {
    const accessToken = await getAccessToken(process.env.STRUCTURE_OWNER_DISCORD_ID, 'fe in');
    const alertAccountId = process.env.CATALIST_TOWER_CEO_ID;
    try {
      if (!accessToken || !alertAccountId) {
        throw new validationError(
          null,
          `리인포스 정보 요청시 필요한 필드가 누락되었습니다.\n처리에 필요한 앵커콥 ID: ${alertAccountId ? '있음' : 'undefined'}\n엑세스 토큰: ${accessToken ? '있음' : 'undefined'}` //보안을 위해 토큰은 출력하지 않음
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
          `앵커꼽의 notification을 가져오는데 실패했습니다 \n reinforceAlert 에러: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log(data[0]);
      if (firstRun) {
        maxNotificationId = data[0].notification_id;
        firstRun = false;
        return;
      }
      console.log('건물 리인 검사중');
      for (const notification of data) {
        if (notification.notification_id <= maxNotificationId) {
          console.log('검사 완료');
          return;
        }
        const notificationType = notification.type;
        switch (notificationType) {
          case 'TowerAlertMsg':
            await discordAlert('알림', '포스가 공격받고 있습니다.');
            break;
          case 'StructureUnderAttack':
            const corpName = notification.text.match(/corpName: (.+)/);
            const shield = notification.text.match(/shieldPercentage: ([\d.]+)/);
            const armor = notification.text.match(/armorPercentage: ([\d.]+)/);
            if (ignoreList.includes(corpName[1])) {
              console.log(`알림 무시: ${corpName[1]}의 공격`);
              break;
            }
            await discordAlert(
              '알림',
              `건물이 공격받고 있습니다!\n공격자 코퍼레이션: ${corpName ? corpName[1] : '알 수 없음'}\n남은 실드: ${shield ? shield[1] : 'N/A'}%\n남은 아머: ${armor ? armor[1] : 'N/A'}%`
            );
            break;
          case 'StructureLostShields':
            await discordAlert('알림', '건물 실드가 파괴되었습니다.');
            break;
          case 'StructureLostArmor':
            await discordAlert('알림', '건물 아머가 파괴되었습니다.');
            break;
        }

        maxNotificationId = notification.notification_id;
      }
    } catch (error) {
      console.error('reinforceAlert에서 에러 발생:', error);
    }
  });
};
