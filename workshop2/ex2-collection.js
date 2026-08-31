// ส่วนที่ 1 — สร้างข้อมูลตั้งต้น (Array of Objects)

const students = [
  { id: "6501", name: "Sompong", major: "CE", score: 85, contact: { email: "sompong@email.com", phone: "081-111-1111" } },
  { id: "6502", name: "Somsri",   major: "IT", score: 45, contact: { email: "somsri@email.com", phone: "082-222-2222" } },
  { id: "6503", name: "Somchai",  major: "CE", score: 72, contact: { email: "somchai@email.com", phone: "083-333-3333" } },
  { id: "6504", name: "Ananda",   major: "IT", score: 38, contact: { email: "ananda@email.com", phone: "084-444-4444" } },
  { id: "6505", name: "Boonmee",  major: "CE", score: 90, contact: { email: "boonmee@email.com", phone: "085-555-5555" } },
  { id: "6506", name: "Chaiyo",   major: "IT", score: 60, contact: { email: "chaiyo@email.com", phone: "086-666-6666" } }
];

// ส่วนที่ 2 — ฟังก์ชันค้นหา (คืนค่า return / ไม่แก้ Array ต้นฉบับ)

// 1. ค้นหาตาม ID
const findById = (list, id) => list.find(s => s.id === id);

// 2. ค้นหาตามสาขา
const findByMajor = (list, major) => list.filter(s => s.major === major);

// 3. เช็กว่ามีคนสอบตก (คะแนน < 50) อย่างน้อย 1 คนหรือไม่
const hasFailingStudent = (list) => list.some(s => s.score < 50);

// 4. ดึงอีเมล โดยใช้ Optional Chaining (?.) และ Nullish Coalescing (??)
const getEmail = (list, id) => {
  const student = findById(list, id);
  return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};

// ส่วนที่ 3 — ทดสอบการทำงาน

console.log("=== ทดสอบการค้นหาปกติ ===");
console.log("Find ID 6501:", findById(students, "6501"));
console.log("Find Major CE:", findByMajor(students, "CE"));
console.log("Has Failing Student?:", hasFailingStudent(students));
console.log("Email ID 6501:", getEmail(students, "6501"));

console.log("\n=== ทดสอบกรณีหาไม่เจอ / ไม่มี Contact ===");
console.log("Find ID 9999:", findById(students, "9999")); // ได้ undefined
console.log("Email ID 9999:", getEmail(students, "9999")); // ได้ "ไม่พบข้อมูลติดต่อ"

// เพิ่มนักศึกษาใหม่โดยไม่ใช้ push (ใช้วิธี Spread Operator [...])
const newStudent = { id: "6507", name: "NoContactUser", major: "CE", score: 80 };
const updatedStudents = [...students, newStudent];

console.log("Email ID 6507 (ไม่มี contact):", getEmail(updatedStudents, "6507")); // ได้ "ไม่พบข้อมูลติดต่อ"