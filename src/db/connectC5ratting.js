import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function connectC5ratting() {
  try {
    let database = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: 'c5Ratting',
    });
    return database;
  } catch (e) {
    console.log(`데이터베이스 연결 실패`, e);
  }
}

export default connectC5ratting;
