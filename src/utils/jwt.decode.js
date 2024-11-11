//이브 홈페이지로 부터 받은 JWT의 payload만 복화해서 씁니다
//esi-characters.read_characters.v1 같은 권한 스코프가 없어서 그런지 API가 작동하지 않네요
//추후 더 좋은 방법이 생기면 수정해주세요!

import jwt from 'jsonwebtoken';

export const decodeJwtToken = token => {
  const decoded = jwt.decode(token);
  return { name: decoded.name, characterId: decoded.sub.split(':')[2],expire:decoded.exp*1000 };//이브에서 준 UNIX 형식 시간과 비교할 수 있도록 같은 ms단위로 맞춤
};
//{name: 'Bonsai game' ,characterId:'2117712894'} 와 같은 형식으로 반환 됩니다

/**
 * decode 된 정보 객체
 {
  "scp": [
    "publicData",
    "esi-calendar.read_calendar_events.v1",
    "esi-search.search_structures.v1",
    "esi-planets.manage_planets.v1",
    "esi-corporations.read_structures.v1",
    "esi-characters.read_chat_channels.v1",
    "esi-characters.read_agents_research.v1",
    "esi-industry.read_character_jobs.v1",
    "esi-characters.read_blueprints.v1",
    "esi-location.read_online.v1",
    "esi-contracts.read_character_contracts.v1",
    "esi-corporations.read_starbases.v1"
  ],
  "jti": "UUIDv4 가 들어갑니다",
  "kid": "JWT-Signature-Key",
  "sub": "CHARACTER:EVE:2117712894",
  "azp": "064a681sa1i38333acfeb25d0906",
  "tenant": "tranquility",
  "tier": "live",
  "region": "world",
  "aud": [
    "064a6810af343138333acfeb25d0906",
    "EVE Online"
  ],
  "name": "Bansai game",
  "owner": "q92WKTiVSVf8YmTrjno506kson8=",
  "exp": 1731323090,
  "iat": 1731321890,
  "iss": "https://login.eveonline.com"
}
 */
