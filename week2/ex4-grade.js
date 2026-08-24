// สาเหตุที่ต้องเช็คเงื่อนไขเรียงจากคะแนนมากไปน้อย (100 -> 0):
// เพราะถ้าเราเริ่มเช็คจากคะแนนน้อยไปมาก เช่น score >= 50 ก่อน คะแนนอย่าง 85 ก็จะตกเงื่อนไขแรกทันที และได้เกรด D ทั้งที่ควรได้ A
// การเรียงจากมากไปน้อยช่วยให้การเปรียบเทียบคะแนนขอบบนผ่านไปก่อนตามลำดับความถูกต้อง

// ฟังก์ชันสำหรับแปลงคะแนนเป็นเกรด
function toGrade(score) {
  // ส่วนที่ 2 — ตรวจข้อมูลนำเข้าก่อนตัดเกรด (Validation)
  if (score < 0 || score > 100) {
    console.log(`คะแนน ${score} -> คะแนนไม่ถูกต้อง ต้องอยู่ระหว่าง 0-100`);
    return; // หยุดการทำงาน ไม่ตัดเกรดให้
  }

  // ส่วนที่ 1 — คำนวณตัดเกรดด้วย if / else if (ใส่ { } ครบทุกครั้ง)
  let grade = "";

  if (score >= 80) {
    grade = "A";
  } else if (score >= 75) {
    grade = "B+";
  } else if (score >= 70) {
    grade = "B";
  } else if (score >= 65) {
    grade = "C+";
  } else if (score >= 60) {
    grade = "C";
  } else if (score >= 55) {
    grade = "D+";
  } else if (score >= 50) {
    grade = "D";
  } else {
    grade = "F";
  }

  console.log(`คะแนน ${score} -> เกรด ${grade}`);
}

// ส่วนที่ 3 — ทดสอบให้ครบทุกค่าด้วย Array และ for...of
const testScores = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

for (const score of testScores) {
  toGrade(score);
}