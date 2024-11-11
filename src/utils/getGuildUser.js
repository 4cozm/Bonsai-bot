import dotenv from 'dotenv';
dotenv.config();

let users; //유저 정보를 리터럴로 변환해서 보관

//서버가 시작될때 자동으로 실행됨, 추후 로직 동작중 유저를 찾지 못했을 경우 아래 함수를 1회 시행후 에러 메세지 반환하도록 설정
export const updateGuildUsers = async client => {
  const guild = await client.guilds.fetch(process.env.GUILDS_NUMBER);
  const guildMembers = await guild.members.fetch();

  users = guildMembers.map(member => ({
    id: member.id,
    name: member.nickname || member.user.tag // nickname이 null이면 user.tag 사용
  }));
  console.log('유저 정보 업데이트 완료');
};

//닉네임을 입력하면 디스코드 ID를 반환함
export const getGuildUserByName = (nickName) => {
  if (!users) {
    console.error('유저 정보가 로드 되지 않은 상태에서 조회 했습니다');
    return;
  }
  const user = users.find(user => user.name === nickName);
  
  if (!user) {
    console.error(`${nickName}을(를) 가진 유저를 찾을 수 없습니다`);
    return;
  }
  
  return user.id;
};
