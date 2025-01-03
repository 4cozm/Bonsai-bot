import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import getCustomError from '../errors/index.js';
dotenv.config();
const { databaseError } = getCustomError();
let pool;
/**
 * @returns {Promise/mysql.connection}
 */
export async function createC5RattingPool() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: 'c5Ratting',
      waitForConnections: false,
      connectionLimit: 5,
      queueLimit: 0,
    });
    console.log('5클조업 DB 연결 풀 생성 성공');
    return pool;
  } catch (e) {
    console.error(`5클랫질 연결 풀 생성 실패`, e);
    throw new databaseError(null, '5클랫질 데이터베이스 연결 풀 생성 실패');
  }
}

export async function connectC5Ratting() {
  if (!pool) {
    return await createC5RattingPool();
  }
  return pool;
}

export default connectC5Ratting;
