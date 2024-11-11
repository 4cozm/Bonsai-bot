//유저 데이터 객체 { 인게임 닉네임,eve 캐릭터 ID} 를 전달받아 동일한 유저를 discord에서 찾고, 저장합니다
import { getGuildUserByName } from '../utils/getGuildUser.js';
import { getConnection } from './connection.js';
import { saveUserData } from './sql/sql.js';

const addUserToDatabase = async (userToken, userData) => {
  try {
    const { name, characterId, expire } = userData;
    const { access_token, refresh_token, expires_in } = userToken;
    if (!name || !characterId || !expire) {
      console.error('유저를 DB에 저장하기 위한 필수 데이터가 누락되었습니다');
      return;
    }
    const connection = getConnection(); //DB의 연결 객체
    let result; //결과 처리를 반환받기 위한 변수

    const discordId = await getGuildUserByName(name);
    if (discordId === 'alt') {
      result = await connection.execute(saveUserData, [null, name, characterId, refresh_token, expires_in]);
      //알트로 가입된 경우 메세지 보내지 않음
    } else {
      result = await connection.execute(saveUserData, [discordId, name, characterId, refresh_token, expires_in]);
      //discordId로 메세지 전송하는 기능으로 캐릭터 등록에 대한 정보를 보내줘야 할듯
    }
    if (result[0].affectedRows === 1) {
      console.log(name, '캐릭터 등록이 완료 되었습니다.');
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error(`이미 DB에 존재하는 캐릭터 정보입니다 `, error.message);
    } else {
      console.error('addUserToDatabase 함수에서 캐릭터 등록 중 오류 발생:', error.message);
    }
  }

  //저장이 완료 된 경우 인메모리에 활성 엑세스 토큰 정보를 저장하는 코드도 필요함
};

export default addUserToDatabase;
