// ข้อมูลตั้งต้น (ใช้อ้างอิงและใช้ฟังก์ชันแปลงเกรดจากข้อก่อนหน้า)

const students = [
  { id: "6501", name: "Sompong", major: "CE", score: 85 },
  { id: "6502", name: "Somsri",   major: "IT", score: 45 },
  { id: "6503", name: "Somchai",  major: "CE", score: 72 },
  { id: "6504", name: "Ananda",   major: "IT", score: 38 },
  { id: "6505", name: "Boonmee",  major: "CE", score: 90 },
  { id: "6506", name: "Chaiyo",   major: "IT", score: 60 }
];

// ฟังก์ชันช่วยตัดเกรดอย่างง่าย
const toGrade = (score) => {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

// ส่วนที่ 1 — นิยามฟังก์ชัน (ห้ามใช้ for/while)

// 1. ดึงเฉพาะรายชื่อทุกคน
const getNames = (list) => list.map(s => s.name);

// 2. ดึงนักศึกษาที่สอบผ่าน (คะแนน >= 50)
const getPassedStudents = (list) => list.filter(s => s.score >= 50);

// 3. รวมคะแนนทั้งหมด
const getTotalScore = (list) => list.reduce((sum, s) => sum + s.score, 0);

// 4. หาคะแนนเฉลี่ย (ทศนิยม 2 ตำแหน่ง / ป้องกัน NaN กรณี Array ว่าง)
const getAverageScore = (list) => {
  if (list.length === 0) return 0;
  const total = getTotalScore(list);
  return Number((total / list.length).toFixed(2));
};

// 5. นับจำนวนนักศึกษาแยกตามเกรด
const countByGrade = (list) => {
  return list.reduce((acc, s) => {
    const grade = toGrade(s.score);
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});
};

// 6. ค้นหานักศึกษาที่ได้คะแนนสูงสุด
const getTopStudent = (list) => {
  if (list.length === 0) return undefined;
  return list.reduce((top, s) => (s.score > top.score ? s : top), list[0]);
};

// ส่วนที่ 2 — ท่อข้อมูลต่อกันบรรทัดเดียว (Chaining)

// โจทย์: หาคะแนนเฉลี่ยของเด็ก CE ที่สอบผ่าน (filter -> map -> reduce)
const cePassedAvg = ((list) => {
  const passedScores = list.filter(s => s.major === "CE" && s.score >= 50).map(s => s.score);
  return passedScores.length === 0 ? 0 : Number((passedScores.reduce((sum, score) => sum + score, 0) / passedScores.length).toFixed(2));
})(students);

// ส่วนที่ 3 — ทดสอบการทำงาน

console.log("=== ทดสอบกับข้อมูลปกติ ===");
console.log("Names:", getNames(students));
console.log("Passed Students:", getPassedStudents(students));
console.log("Total Score:", getTotalScore(students));
console.log("Average Score:", getAverageScore(students));
console.log("Count By Grade:", countByGrade(students));
console.log("Top Student:", getTopStudent(students));
console.log("CE Passed Avg (One line chain):", cePassedAvg);

console.log("\n=== ทดสอบกรณีขอบ (Edge Case: Array ว่าง []) ===");
const emptyList = [];
console.log("Names ([]):", getNames(emptyList));              // []
console.log("Passed ([]):", getPassedStudents(emptyList));     // []
console.log("Total ([]):", getTotalScore(emptyList));          // 0
console.log("Average ([]):", getAverageScore(emptyList));      // 0 (ไม่ขึ้น NaN)
console.log("Count Grade ([]):", countByGrade(emptyList));    // {}
console.log("Top Student ([]):", getTopStudent(emptyList));   // undefined