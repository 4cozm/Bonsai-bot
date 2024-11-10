import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

let connection;

export const connectToDatabase = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    });
    console.log('DB 연결 성공');
  } catch (error) {
    console.error('DB 연결 실패:', error);
    // 404 채널로 에러 메시지 전송 로직 추가
    return null;
  }
};

export const getConnection = () => {
  if (!connection) {
    console.error('DB가 연결되지 않은 상태에서 호출 했습니다');
    //404 채널로 에러메세지 전송 - DB연결이 끊어져 있습니다
    return;
  }
  return connection;
};
