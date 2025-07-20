//DB를 조회해서 DM 서빙을 요청한 사람들에게 게인 메세지를 보냄

import { getAllDmSubscribe } from '../db/dmServing/getAllDmSubscribe.js';
import { discordAlert } from '../utils/discordAlert.js';
import { getClientInstance } from '../utils/discordClientManger.js';
import { getExistingGuildUsers } from '../utils/getExistingGuildUsers.js';
import { getOnlineDiscordUsers } from '../utils/getOnlineDiscordUsers.js';

/**
 * @param {'here' | 'everyone'} kind - 알림의 종류 ('here' 또는 'everyone')
 * @param {message} message - 메세지 객체
 */
export const sendDmToSubscriber = async (kind, message) => {
  const discordClientInstance = getClientInstance();
  console.log('DM 서빙기능 동작');
  const userList = await getAllDmSubscribe(); //구독한 모든 유저 가져오기
  let targetList = [];

  if (kind === 'here') {
    //userList를 바탕으로 온라인인 사람 확인후 전달
    targetList = await getOnlineDiscordUsers(userList, discordClientInstance);
  } else if (kind === 'everyone') {
    //userList 전체에 서빙
    targetList = await getExistingGuildUsers(userList, discordClientInstance);
  }
  if (targetList.length === 0) {
    console.log(`DM 보낼 대상 없음 (kind=${kind})`);
    return;
  }
  for (const userId of targetList) {
    try {
      const user = await discordClientInstance.users.fetch(userId);
      const displayName = message.member?.nickname || message.author.username;
      await user.send(`(알림서빙)${displayName}님의 메세지 :${message.content}`);
      console.log(`DM 전송 성공: ${user.tag}`);
    } catch (error) {
      await discordAlert('404', '알림 DM으로 서빙 - sendDmToSubscriber함수에서 에러 발생', error.message);
      console.error(`DM 전송 실패 (${userId}): ${error.message}`);
    }
  }
};
