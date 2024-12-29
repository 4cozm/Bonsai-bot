import dotenv from 'dotenv';
import { getClientInstance } from './discordClientManger.js';
dotenv.config();

let users; //유저 정보를 리터럴로 변환해서 보관
//서버가 시작될때 자동으로 실행됨, 추후 로직 동작중 유저를 찾지 못했을 경우 아래 함수를 1회 시행후 에러 메세지 반환하도록 설정
export const updateGuildUsers = async () => {
  try {
    const client = getClientInstance();
    const guild = await client.guilds.fetch(process.env.GUILDS_NUMBER);
    const guildMembers = await guild.members.fetch();

    users = guildMembers.map(member => ({
      id: member.id,
      name: member.nickname ? member.nickname.toLowerCase() : member.user.tag.toLowerCase(), // nickname이 null이면 user.tag 사용
    }));
    console.log(`디스코드 유저 정보 ${Object.keys(users).length}명 업데이트 완료`);
  } catch (error) {
    console.error('디스코드에서 유저 정보를 가져오는 updateGuildUsers 함수 실행중 오류가 발생 했습니다', error);
  }
};

//닉네임을 입력하면 디스코드 ID를 반환함,검색이 안된 경우,1회 재 시도후 "alt"문자열을 반환함
export const getGuildUserByName = async nickName => {
  if (!users) {
    console.error(
      '유저 정보가 로드 되지 않은 상태에서 조회 했습니다.다시 로드합니다,코드 순서에 문제가 있는지 확인해주세요'
    );
    await updateGuildUsers();
  }

  //1차 유저 검색 시행
  let user = findUser(nickName);

  // 유저가 발견되지 않으면 유저 정보를 업데이트 후 재시도
  if (!user) {
    console.error(
      `${nickName.toLowerCase()}을(를) 가진 유저를 찾을 수 없습니다. 유저 목록을 새로고침 후 1회 재시도 합니다.`
    );
    await updateGuildUsers();
    user = findUser(nickName);
  }

  // 유저가 여전히 발견되지 않으면 'alt' 반환
  if (!user) {
    console.error(
      `유저 목록 새로고침 후에도 ${nickName.toLowerCase()}을(를) 찾을 수 없습니다. 해당 계정을 알트 계정으로 처리합니다.`
    );
    return 'alt';
  }

  return user.id;
};

const findUser = nickName => {
  const toLowerCaseNick = nickName.toLowerCase();
  const user = users.find(user => user.name === toLowerCaseNick);
  return user;
};
