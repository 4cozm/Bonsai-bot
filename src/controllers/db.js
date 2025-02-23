//서버에서 데이터를 요청하는 구문을 정리해둔 컨트롤러

import getAltCharacterName from '../db/getAltCharacterName.js';

export const getAltCharacters = async (req, res) => {
  const { characterId } = req.body;

  if (!characterId) {
    return res.status(400).json({ error: 'characterId가 전달되지 않았습니다' });
  }

  try {
    const result = await getAltCharacterName(characterId);
    
    console.log('전달하는 값:', result);
    return result;
  } catch (e) {
    return res.status(500).json({ error: '서버 내부 오류', e });
  }
};
