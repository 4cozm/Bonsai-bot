import cron from 'node-cron';
import { getStructureFuel } from './getStructureFuelData.js';
import { structureTypeMapping } from '../commands/utility/structureFuelAmount.js';
import { discordAlert } from '../utils/discordAlert.js';

const alertRemainDate = 15; // 15일 이하로 떨어지면 알림
let isAlerting = false;
// DT한시간 뒤 시작하는 cron job
export const checkStructureFuelPerDay = () => {
  console.log('연료 부족 알림 등록 완료');
  cron.schedule('0 12 * * *', async () => {
    const structures = await getStructureFuel();
    const now = new Date();
    structures.forEach(structure => {
      const { name, fuel_expires, type_id } = structure;
      const expiresDate = new Date(fuel_expires);
      const remainingDays = Math.ceil((expiresDate - now) / (1000 * 60 * 60 * 24));
      if (remainingDays <= alertRemainDate) {
        const buildingType = structureTypeMapping[type_id] || { name: '알 수 없음', emoji: ':question:' };
        const displayType = `${buildingType.emoji} ${buildingType.name}`;
        discordAlert('알림', `연료가 ${remainingDays}일 남은 ${name}(${displayType})가 있습니다.`);
        isAlerting = true;
      }
    });
    if (!isAlerting) {
      discordAlert('모든 건물의 연료가 안전합니다.');
      isAlerting = false;
    }
  });
};
