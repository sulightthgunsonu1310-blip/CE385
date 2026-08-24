// สูตรการคำนวณ:
// 1. คะแนน Workshop ที่แปลงแล้ว = (คะแนนดิบ / 60) * 20
// 2. คะแนนรวม = Workshop (แปลงแล้ว) + Attendance + Project + Midterm + Final
// 3. คะแนนที่ยังขาด = 80 - คะแนนรวม

// ส่วนที่ 1 — กำหนดค่าคงที่สำหรับเกณฑ์คะแนน (ห้ามพิมพ์ตัวเลขดิบกลางสูตร)
const WORKSHOP_RAW_MAX = 60;
const WORKSHOP_WEIGHT = 20;
const MAX_SCORE = 100;
const TARGET_SCORE = 80;

// สร้างตัวแปรเก็บคะแนนดิบของนักศึกษา
const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

// ส่วนที่ 2 — คำนวณคะแนน
const workshopConverted = (workshopRaw / WORKSHOP_RAW_MAX) * WORKSHOP_WEIGHT;
const totalScore = workshopConverted + attendance + project + midterm + final;
const percentage = (totalScore / MAX_SCORE) * 100;
const scoreNeeded = TARGET_SCORE - totalScore;

// ส่วนที่ 3 — แสดงผลด้วย Template Literal (ใช้ .toFixed(2) ตอนแสดงผลเท่านั้น)
console.log(`===== ใบสรุปคะแนนรายวิชา CE385 =====
คะแนน Workshop (ดิบ)	: ${workshopRaw}/${WORKSHOP_RAW_MAX}
คะแนน Workshop (แปลงแล้ว)	: ${workshopConverted.toFixed(2)} / ${WORKSHOP_WEIGHT}
คะแนนการเข้าเรียน	: ${attendance.toFixed(2)}
คะแนนโปรเจกต์		: ${project.toFixed(2)}
คะแนนกลางภาค (Midterm)	: ${midterm.toFixed(2)}
คะแนนปลายภาค (Final)	: ${final.toFixed(2)}
-------------------------------------
คะแนนรวมทั้งหมด		: ${totalScore.toFixed(2)} / ${MAX_SCORE.toFixed(2)}
คิดเป็นเปอร์เซ็นต์	: ${percentage.toFixed(2)}%
คะแนนที่ขาดจากเกณฑ์ 80	: ${scoreNeeded.toFixed(2)} คะแนน
=====================================`);