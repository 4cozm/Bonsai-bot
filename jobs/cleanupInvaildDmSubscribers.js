import dotenv from 'dotenv';
import cron from 'node-cron';
import { disableDmSubByDiscordId } from '../src/db/dmServing/disableDmSubByDiscordId.js';
import { getAllDmSubscribe } from '../src/db/dmServing/getAllDmSubscribe.js';
import { getClientInstance } from '../src/utils/discordClientManger.js';
import { hasPrivilegedRole } from '../src/utils/hasPrivilegedRole.js';

dotenv.config();

export const startDailyCleanupJob = () => {
  cron.schedule(
    '0 20 * * *',
    async () => {
      console.log('🕗 [CRON] 오후 8시 - DM 구독자 정리 작업 시작');
      try {
        await cleanupInvalidDmSubscribers();
        console.log('✅ [CRON] DM 구독자 정리 완료');
      } catch (err) {
        console.error('❌ [CRON] 구독자 정리 실패:', err);
      }
    },
    {
      timezone: 'Asia/Seoul',
    }
  );

  console.log('📅 [CRON] DM 서빙 클린업 작업 예약됨 (node-cron)');
};

async function cleanupInvalidDmSubscribers() {
  const client = getClientInstance();
  const guild = await client.guilds.fetch(process.env.GUILDS_NUMBER);
  const subscribedUsers = await getAllDmSubscribe();

  for (const userId of subscribedUsers) {
    const isValid = await isUserStillValid(guild, userId);
    if (!isValid) {
      await disableDmSubByDiscordId(userId);
      console.log(`🔇 DM 구독 비활성화됨: ${userId}`);
    }
  }
}

async function isUserStillValid(guild, userId) {
  try {
    await guild.members.fetch(userId); // 존재 여부 확인
    const hasRole = await hasPrivilegedRole(userId);
    return hasRole;
  } catch (err) {
    if (err.code === 10007) {
      // Unknown Member (길드 탈퇴 또는 강퇴)
      return false;
    }

    console.error(`⚠️ 유저 확인 실패 (${userId}): ${err.message}`);
    return true; // 오류로 판단 불가 → 일단 유지
  }
}
