//디스코드의 특정 채널에 글을 쓰는 함수
import { getClientInstance } from './discordClientManger.js';
import getCustomError from '../errors/index.js';
const { discordAPIError, validationError } = await getCustomError();

const typeMappings = {
  채팅: 968306219234238529n,
  운송: 968326885878689892n,
  장터: 1073184291720286208n,
  404: 1296498014860480652n,
  알림: 1293473442011676703n,
};
/**
 * 채팅,운송,장터,404,알림 선택가능
 * @param {String} channelName
 * @param {String} message
 */
export const discordAlert = async (channelName, message) => {
  const client = getClientInstance();
  const channel = await client.channels.fetch(typeMappings[channelName]);
  try {
    const channelId = typeMappings[channelName];
    if (channelId === undefined) {
      // typeMappings에 채널명이 없을 경우 에러 출력
      throw new validationError(`❌ discordAlert오류 "${channelName}" 채널을 찾을 수 없습니다.`);
    }
    if (channel) {
      await channel.send(message);
    } else {
      throw new discordAPIError(channelName, 'discordAlert함수에서 채널을 찾는데 실패함');
    }
  } catch (error) {
    console.error('discordAlert에서 오류 발생:', error);
  }
};
