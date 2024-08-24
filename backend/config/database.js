import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function connectDB() {
  try {
    const db = await open({
      filename: process.env.DATABASE_URL,
      driver: sqlite3.Database,
    });
    console.log('Database connection successful');

    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return db;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}
