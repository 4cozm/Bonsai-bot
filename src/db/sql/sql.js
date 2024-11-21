/**
 * User 데이터베이스 스키마
 *
 * @typedef {Object} User
 * @property {number} id - 내부 인덱싱용 고유 ID.
 * @property {number|null} discord - 디스코드 ID. 알트 계정의 경우 등록 전까지 null로 처리.
 * @property {string} name - EVE Online 캐릭터 이름 (소문자로 변환되어 저장됨).
 * @property {string} characterId - EVE Online 캐릭터의 고유 ID.
 * @property {string} refreshToken - 액세스 토큰 발급에 필요한 리프레시 토큰.
 * @property {number} expire - 액세스 토큰이 만료되는 시간 (UNIX 타임스탬프, 초 단위).
 * @property {Date} addDate - 튠이 Catalyst for You ESI에 등록된 시간 (자동 타임스탬프).
 */
export const saveUserData =
  'INSERT INTO users (discord, name, characterId, refreshToken, expire) VALUES (?, ?, ?, ?, ?)';

export const getRefreshToken = 'SELECT refreshToken FROM users WHERE name = ? AND discord = ?';

export const accessDeniedRequestRefreshToken = 'SELECT refreshToken FROM users WHERE name = ?';
