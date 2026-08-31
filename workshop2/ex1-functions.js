// 1. ตรวจสอบว่าคะแนนถูกต้องหรือไม่ (0 - 100)
const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;

// 2. แปลงคะแนนเป็นเกรด (ใช้ Array ของเกณฑ์ + find แทนการใช้ if ซ้อนกัน)
const toGrade = (score) => {
  if (!isValidScore(score)) return 'N/A';

  const gradeCriteria = [
    { min: 80, grade: 'A' },
    { min: 75, grade: 'B+' },
    { min: 70, grade: 'B' },
    { min: 65, grade: 'C+' },
    { min: 60, grade: 'C' },
    { min: 55, grade: 'D+' },
    { min: 50, grade: 'D' },
    { min: 0,  grade: 'F' }
  ];

  const matched = gradeCriteria.find(item => score >= item.min);
  return matched ? matched.grade : 'F';
};

// 3. คำนวณคะแนน Workshop (ใช้ Default Parameter)
const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
  if (!isValidScore(raw) || full <= 0) return 0;
  return (raw / full) * weight;
};

// 4. คำนวณคะแนนรวม 5 ก้อน
const calculateTotal = (workshop, attendance, project, midterm, final) => {
  return workshop + attendance + project + midterm + final;
};

// ส่วนที่ 2 — ทดสอบสร้างข้อมูลนักศึกษา 3 คน และแสดงผลเป็นตาราง

const students = [
  { name: "พีพี", workshop: 48, attendance: 10, project: 18, midterm: 22, final: 25 },
  { name: "เอส",   workshop: 55, attendance: 8,  project: 15, midterm: 18, final: 20 },
  { name: "เจเจ",  workshop: 30, attendance: 5,  project: 10, midterm: 12, final: 15 }
];

const studentResults = students.map(student => {
  const wsScore = calculateWorkshopScore(student.workshop, 60, 20);
  const totalScore = calculateTotal(
    wsScore, 
    student.attendance, 
    student.project, 
    student.midterm, 
    student.final
  );

  return {
    "Name": student.name,
    "WS (Calculated)": wsScore,
    "Total Score": totalScore,
    "Grade": toGrade(totalScore)
  };
});

console.log("=== ผลลัพธ์การคำนวณคะแนนนักศึกษา ===");
console.table(studentResults);

// ส่วนที่ 3 — พิสูจน์การทำงานของ Default Parameters

console.log("\n=== พิสูจน์ค่าเริ่มต้น (Default Parameters) ===");

const res1 = calculateWorkshopScore(48);
const res2 = calculateWorkshopScore(48, 60, 20);
console.log(`calculateWorkshopScore(48): ${res1}`);
console.log(`calculateWorkshopScore(48, 60, 20): ${res2}`);
console.log(`ผลลัพธ์เท่ากันหรือไม่: ${res1 === res2}`);

const res3 = calculateWorkshopScore(48, undefined, 25);
console.log(`calculateWorkshopScore(48, undefined, 25): ${res3}`);
