import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export let pool: mysql.Pool;

export async function initDb() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "app_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // quick connection test
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("MySQL pool initialized");
  } catch (err) {
    console.warn(
      "MySQL pool created but initial ping failed:",
      err?.message || err,
    );
  }
}
