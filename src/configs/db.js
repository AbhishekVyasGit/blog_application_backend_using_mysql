
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Database connection established successfully.');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    throw err; // Re-throw the error to handle it in server.js
  }
};

module.exports = { db, testConnection };
