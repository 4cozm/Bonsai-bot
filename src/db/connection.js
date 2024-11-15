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

/**
 *
 * @returns 연결 객체를 반환,연결이 유효하지 않다면 재연결 후 반환함
 */
export const getConnection = async () => {
  if (!connection) {
    return await connectToDB();
  }

  try {
    await connection.ping();
  } catch (error) {
    connection = await connectToDB();
  }

  return connection;
};
