import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import errors from '../errors/index.js';
dotenv.config();

let pool;
const { databaseError } = errors;

// DB 연결 풀 생성
export const connectToDatabase = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      waitForConnections: false,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('DB 연결 풀 생성 성공');
    return pool;
  } catch (error) {
    console.error('DB 연결 풀 생성 실패:', error);
    throw new databaseError(error.message, 'DB 연결 풀 생성 실패');
  }
};

/**
 * 연결 객체를 반환, 연결이 유효하지 않다면 재연결 후 반환
 */
export const getConnection = async () => {
  if (!pool) {
    return await connectToDatabase();
  }

  try {
    await pool.ping(); // 연결 상태 확인
  } catch (error) {
    // 연결 상태가 좋지 않으면 재연결
    pool = await connectToDatabase();
  }

  return pool;
};
