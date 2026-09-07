const students = [
  { id: "6501", name: "Somchai", major: "CE", score: 85 },
  { id: "6502", name: "Somsri", major: "CS", score: 72 },
  { id: "6503", name: "Somsak", major: "SE", score: 48 },
  { id: "6504", name: "Sompor", major: "IT", score: 91 }
];

function toGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// ส่วนที่ 1: คืน Promise
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }
      resolve({ ...student });
    }, 300);
  });
}

// ส่วนที่ 2: เรียกใช้ 3 กรณีด้วย .then / .catch / .finally
console.log("--- ทดสอบ 3 กรณี ---");
fetchStudentByIdAsync("6501")
  .then((data) => console.log("เคส 1 สำเร็จ:", data))
  .catch((err) => console.error("เคส 1 ล้มเหลว:", err.message))
  .finally(() => console.log("เคส 1 ทำงานเสร็จสิ้น"));

fetchStudentByIdAsync("9999")
  .then((data) => console.log("เคส 2 สำเร็จ:", data))
  .catch((err) => console.error("เคส 2 ล้มเหลว:", err.message))
  .finally(() => console.log("เคส 2 ทำงานเสร็จสิ้น"));

fetchStudentByIdAsync(42)
  .then((data) => console.log("เคส 3 สำเร็จ:", data))
  .catch((err) => console.error("เคส 3 ล้มเหลว:", err.message))
  .finally(() => console.log("เคส 3 ทำงานเสร็จสิ้น"));

// ส่วนที่ 3: โซ่ 3 ขั้น
setTimeout(() => {
  console.log("\n--- ทดสอบ การต่อโซ่ 3 ขั้น ---");
  fetchStudentByIdAsync("6501")
    .then((student) => {
      // ขั้น 1: แปลงเป็น { name, grade }
      return { name: student.name, grade: toGrade(student.score) };
    })
    .then((result) => {
      // ขั้น 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
      return `รายงาน: คุณ ${result.name} ได้เกรด ${result.grade}`;
    })
    .then((report) => {
      // ขั้น 3: พิมพ์ออกทาง console
      console.log(report);
    })
    .catch((err) => console.error("เกิดข้อผิดพลาดในการทำโซ่:", err.message));
}, 1000);

// ส่วนที่ 4 (โบนัส): promisify อเนกประสงค์
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}

// ทดสอบ promisify กับฟังก์ชั่น callback ตัวอย่าง
function dummyCallbackFunc(x, cb) {
  setTimeout(() => {
    if (x < 0) cb(new Error("ค่าต้องไม่ติดลบ"));
    else cb(null, x * 2);
  }, 300);
}

const dummyAsync = promisify(dummyCallbackFunc);
setTimeout(() => {
  console.log("\n--- ทดสอบ Promisify ---");
  dummyAsync(10)
    .then((res) => console.log("Promisify Result:", res))
    .catch((err) => console.error("Promisify Error:", err.message));
}, 2000);