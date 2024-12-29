//유저 데이터 객체 { 인게임 닉네임,eve 캐릭터 ID} 를 전달받아 동일한 유저를 discord에서 찾고, 저장합니다
import { getGuildUserByName } from '../utils/getGuildUser.js';
import { getConnection } from './connection.js';
import { saveUserData } from './sql/sql.js';
import { updateRegistrationMessage } from '../commands/utility/esiRegister.js';
import { getUserIdByState } from '../esi/stateManager.js';
import { getCharacterNameByDiscordId } from './getCharacterNameByDiscordId.js';

//DB에 유저를 저장하며 디스코드 명령어를 사용했던 채팅을 수정하여 결과를 알려줌
const addUserToDatabase = async (userToken, userData, state) => {
  try {
    const { name, characterId, expire } = userData;
    const { access_token, refresh_token, expires_in } = userToken;
    if (!name || !characterId || !expire) {
      console.error('유저를 DB에 저장하기 위한 필수 데이터가 누락되었습니다');
      return;
    }
    const connection = await getConnection(); //DB의 연결 객체
    let result; //결과 처리를 반환받기 위한 변수

    let discordId = await getGuildUserByName(name);
    if (discordId === 'alt') {
      discordId = getUserIdByState(state);
      result = await connection.execute(saveUserData, [discordId, name, characterId, refresh_token, expires_in]);
    } else {
      result = await connection.execute(saveUserData, [discordId, name, characterId, refresh_token, expires_in]);
    }
    if (result[0].affectedRows === 1) {
      const names = await getCharacterNameByDiscordId(discordId); //디스코드 아이디를 기반으로 DB조회해서 어떤 계정들이 가입되어 있는지 확인
      await updateRegistrationMessage(
        state,
        `${name}이 성공적으로 등록되었습니다.\n현재 등록된 계정:\n${names.join('\n')}`
      );
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const names = await getCharacterNameByDiscordId(discordId);
      updateRegistrationMessage(state, `❌ 이미 등록된 캐릭터입니다 \n현재 등록된 계정:\n${names.join('\n')}`);
    } else {
      updateRegistrationMessage(state, '캐릭터 등록중 오류 발생- 관리자에게 문의 해주세요');
      console.error('addUserToDatabase 함수에서 캐릭터 등록 중 오류 발생:', error.message);
    }
  }

  //저장이 완료 된 경우 인메모리에 활성 엑세스 토큰 정보를 저장하는 코드도 필요함
};

export default addUserToDatabase;
