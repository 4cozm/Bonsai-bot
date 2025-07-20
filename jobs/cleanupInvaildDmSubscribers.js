// 매일 자동으로 서버에서 나갔거나 강퇴된 유저의 DM 서빙을 비활성화

import dotenv from 'dotenv';
import cron from 'node-cron';
import { disableDmSubByDiscordId } from '../src/db/dmServing/disableDmSubByDiscordId.js';
import { getAllDmSubscribe } from '../src/db/dmServing/getAllDmSubscribe.js';
import { getClientInstance } from '../src/utils/discordClientManger.js';

dotenv.config();

/**
 * 매일 오후 8시에 DM 구독자 정리 작업 실행
 */
export const startDailyCleanupJob = () => {
  cron.schedule(
    '0 20 * * *',
    async () => {
      console.log('🕗 [CRON] 오후 8시 - DM 구독자 정리 작업 시작');
      try {
        await cleanupInvalidDmSubscribers();
        console.log('✅ [CRON] DM 구독자 정리 완료');
      } catch (err) {
        console.error('❌ [CRON] 구독자 정리 작업 중 오류 발생:', err);
      }
    },
    {
      timezone: 'Asia/Seoul',
    }
  );

  console.log('📅 [CRON] DM 서빙 클린업 체커 등록 완료 (node-cron)');
};

const cleanupInvalidDmSubscribers = async () => {
  const client = getClientInstance();
  const guild = await client.guilds.fetch(process.env.GUILDS_NUMBER);
  const subscribedUsers = await getAllDmSubscribe();

  for (const userId of subscribedUsers) {
    try {
      await guild.members.fetch(userId); // 존재 확인 시도
      // 존재하면 아무 일도 하지 않음
    } catch (err) {
      if (err.code === 10007) {
        // Unknown Member
        await disableDmSubByDiscordId(userId);
        console.log(`🔇 DM 구독 비활성화됨: ${userId} (서버에 없음)`);
      } else {
        console.error(`⚠️ 유저 확인 실패 (${userId}): ${err.message}`);
      }
    }
  }
};
