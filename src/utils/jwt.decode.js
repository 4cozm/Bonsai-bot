//이브 홈페이지로 부터 받은 JWT의 payload만 복화해서 씁니다
//esi-characters.read_characters.v1 같은 권한 스코프가 없어서 그런지 API가 작동하지 않네요
//추후 더 좋은 방법이 생기면 수정해주세요!

import jwt from 'jsonwebtoken';

export const decodeJwtToken = token => {
  const decoded = jwt.decode(token);
  return decoded.name;
};
