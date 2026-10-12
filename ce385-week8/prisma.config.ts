import "dotenv/config"; // โหลดค่าจาก .env เข้า process.env ก่อนใช้งาน
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",      // ไฟล์ที่บอกว่าฐานข้อมูลมีตารางอะไร
  migrations: {
    path: "prisma/migrations",         // ที่เก็บประวัติการเปลี่ยนแปลงฐานข้อมูล
    seed: "tsx prisma/seed.ts",        // คำสั่งที่ prisma db seed จะเรียก
  },
  datasource: {
    url: env("DATABASE_URL"),          // อ่านสายเชื่อมต่อจาก .env
  },
});