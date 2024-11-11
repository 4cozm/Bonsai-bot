import dotenv from 'dotenv';
dotenv.config();

let users;

//서버가 시작될때 자동으로 실행됨, 추후 로직 동작중 유저를 찾지 못했을 경우 아래 함수를 1회 시행후 에러 메세지 반환하도록 설정
export const updateGuildUsers = async client => {
  const guild = await client.guilds.fetch(process.env.GUILDS_NUMBER);
  users = await guild.members.fetch();
  //유저 정보는 Map 방식으로 반환됨
  console.log('유저 정보 업데이트 완료');
};

export const getGuildUsers = () => {
  if (!users) {
    console.error('유저 정보가 로드 되지 않은 상태에서 조회 했습니다');
    return;
  }
  return users;
};
