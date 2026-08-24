// ประกาศตัวแปรเก็บข้อมูลส่วนตัว (ห้ามใช้ var)
const nickname = "กุ๊กกิ๊ก";
const studentId = "67111873";
const age = 20;
const major = "วิศวกรรมคอมพิวเตอร์";
const registeredCourses = 6;

// คำนวณปีที่จะจบจากตัวแปร (สมมติเหลือเวลาอีก 2 ปี)
const yearsRemaining = 2;
const currentYear = 2569;
const graduationYear = currentYear + yearsRemaining;

// แสดงผลด้วย Template Literal (ห้ามใช้ + ต่อข้อความ)
console.log(`===== บัตรแนะนำตัว =====
ชื่อเล่น	: ${nickname}
รหัสนักศึกษา	: ${studentId}
อายุ	: ${age} ปี
สาขาวิชา	: ${major}
ลงทะเบียน	: ${registeredCourses} วิชา
ปีที่จะจบ	: ${graduationYear}
========================`);