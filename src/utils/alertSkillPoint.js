//매주 화요일DT직후 스킬포인트 알림 전송

import { discordAlert } from './discordAlert.js';

export const alertSkillPoint = async () => {
    try {
        const now = new Date(Date.now());
        const day = now.getDay();
        const stickerId = '1323643503997354014'; //스킬포인트 스티커 ID
        if (day == 2) {
            await discordAlert('채팅', {
                stickers: [stickerId],
            });
            console.log('스킬포인트 알림 전송 완료');
        }
    } catch (e) {
        console.error('스킬포인트 알리미에서 에러 발생', e);
    }
};
