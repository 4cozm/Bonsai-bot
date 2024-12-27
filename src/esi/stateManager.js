import crypto from 'crypto';
import getCustomError from '../errors/index.js';
const { dataNotFoundError } = await getCustomError();
//ESI 인증에 사용되는 개인 별 일련번호 state 를 관리해줌
//state는 ESI 등록 링크에 포함되어 있으며,중복되지 않는 고유의 값임
//서버에서는 ESI인증코드를 요청한 사람의 DISCORD ID를 state와 연결해서 저장함
//알트계정이 별도의 소유권 부여 처리 없이도 ESI 등록자 == 알트 계정 주인 으로 처리 돨 수 있도록 하기위함임

const state = {};
const expireTime = 300000; // 5분

export const createState = (discordId, channelId) => {
  const stateNumber = crypto.randomBytes(16).toString('hex'); //일련번호 생성
  state[stateNumber] = {
    discordId: discordId,
    channelId: channelId,
    messageId: null,
    expire: Date.now() + expireTime,
  }; //discord ID 키가 중복이면 자동으로 덮어씀
  return stateNumber;
};

export const addReplyMessage = (state, replyMessage) => {
  // replyMessage에서 messageId를 추출하여 상태에 업데이트
  if (state[state]) {
    state[state].messageId = replyMessage.id;
  }
};

export const deleteState = stateNumber => {
  if (state[stateNumber]) {
    delete state[stateNumber]; // 해당 discordId에 해당하는 요소 삭제
  }
};

export const checkState = stateNumber => {
  if (!state[stateNumber]) {
    throw new dataNotFoundError('존재하지 않는 일련번호 값입니다:', stateNumber);
    //없는 일련번호가 조회 될 경우 에러
  }
  if (state[stateNumber].expire < Date.now()) {
    //일련번호가 만료됨
    return false;
  }
  return true;
};

export const getMessageId = stateNumber => {
  if (!state[stateNumber]) {
    throw new dataNotFoundError('존재하지 않는 일련번호 값입니다:', stateNumber);
    //없는 일련번호가 조회 될 경우 에러
  }
  return { messageId: state[stateNumber].messageId, channelId: state[stateNumber].channelId };
};
