import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const sql = postgres({
  host: process.env.HOST_DATABASE,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl : process.env.DATABASE_SSL
});



try {
  const result = await sql`SELECT 1+1 AS result`;
  console.log("Database Connected!", result[0].result);
} catch (err) {
  console.error("Database connection failed:", err);
}

export default sql;
