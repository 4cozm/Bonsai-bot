CREATE DATABASE ESI

USE ESI

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discord VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  characterId VARCHAR(255) NOT NULL,
  refreshToken TEXT NOT NULL,
  expire INT NOT NULL,
  addDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (characterId),
  INDEX idx_discord (discord)
);

/*
id 내부 인덱싱용
discord 디스코드 ID - 알트의 경우 등록 전까지 null로 처리
name은 eve online 캐릭터의 이름 (소문자 변환으로 저장 됨)
characterId 는 eve online 캐릭터의 고유 ID
refreshToken은 엑세스 토큰을 발급 받기 위한 키
expire은 엑세스 토큰이 만료되는 시간
addDate 는 해당 튠이 캣포유 ESI에 등록된 시간
INDEX는 내부 인덱싱용
*/

CREATE TABLE dmSubscribe (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discord_id VARCHAR(255) NOT NULL UNIQUE,
  sub BOOLEAN NOT NULL
);

CREATE DATABASE c5Ratting

USE c5Ratting

CREATE TABLE stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  totalBlueLoot FLOAT NOT NULL,
  blueLootPerHour FLOAT NOT NULL,
  totalSalvage FLOAT NOT NULL,
  blueLootTax FLOAT NOT NULL,
  SalvageTax FLOAT NOT NULL,
  totalTax FLOAT NOT NULL,
  duration INT NOT NULL,
  composition VARCHAR(255) NOT NULL,
  rattingdate DATE NOT NULL
)
/*
id 데이터가 들어온 순서대로 숫자 부여
totalBlueLoot 총 블루룻
client 클라 수
blueLootPerHour 시간당 블루룻 (클라당)
totalSalvage 총 샐비징
blueLootTax 블루룻 세금
SalvageTax 샐비징 세금
totalTax 총 세금
duration 걸린 시간
composition 컴포
*/

