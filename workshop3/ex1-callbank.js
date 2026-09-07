// ส่วนที่ 1: ข้อมูลตั้งต้น
const students = [
  { id: "6501", name: "Somchai", major: "CE", score: 85 },
  { id: "6502", name: "Somsri", major: "CS", score: 72 },
  { id: "6503", name: "Somsak", major: "SE", score: 48 },
  { id: "6504", name: "Sompor", major: "IT", score: 91 }
];

// ส่วนที่ 2: ฟังก์ชั่น fetchStudentById แบบ Error-First Callback
function fetchStudentById(id, callback) {
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }

  setTimeout(() => {
    const student = students.find((s) => s.id === id);
    if (!student) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }
    // คืนสำเนาเสมอ
    callback(null, { ...student });
  }, 300);
}

// ส่วนที่ 3: เรียกใช้ครบ 3 กรณี
console.log("--- เริ่มการทดสอบ ข้อ 1 ---");

// ก) id ที่มีจริง
fetchStudentById("6501", (err, student) => {
  if (err) {
    console.error("ก) เกิดข้อผิดพลาด:", err.message);
    return;
  }
  console.log("ก) พบข้อมูล:", student);
});

// ข) id ที่ไม่มีจริง
fetchStudentById("9999", (err, student) => {
  if (err) {
    console.error("ข) เกิดข้อผิดพลาด:", err.message);
    return;
  }
  console.log("ข) พบข้อมูล:", student);
});

// ค) id ผิดรูปแบบ (เช่น ตัวเลข 42)
fetchStudentById(42, (err, student) => {
  if (err) {
    console.error("ค) เกิดข้อผิดพลาด:", err.message);
    return;
  }
  console.log("ค) พบข้อมูล:", student);
});
