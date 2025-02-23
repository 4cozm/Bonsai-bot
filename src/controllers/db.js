//서버에서 데이터를 요청하는 구문을 정리해둔 컨트롤러
//요청한 데이터를 처리해주기 위해서 hmac이 필요함

import getAltCharacterName from '../db/getAltCharacterName.js';
import { verifyHMAC } from '../encryption/hmac.js';

export const getAltCharacters = async (req, res) => {
  const { characterId, hmac } = req.body;
  if (!characterId) {
    return res.status(400).json({ error: 'characterId가 전달되지 않았습니다' });
  } else if (!hmac) {
    return res.status(400).json({ error: 'hmac 코드가 전달되지 않았습니다' });
  }

  try {
    if (!verifyHMAC(characterId, hmac)) {
      res.status(400).json({ error: 'Hmac코드 오류' });
    }
    const result = await getAltCharacterName(characterId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: '서버 내부 오류', e });
  }
};
