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

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }
    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา <${id}>`));
      }
      resolve({ ...student });
    }, 300);
  });
}

// ส่วนที่ 1: ดึงทีละคน (ตามลำดับ)
async function reportSequential() {
  const start = Date.now();
  const ids = ["6501", "6502", "6503"];
  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`[Sequential] พบ: ${student.name} (เกรด ${toGrade(student.score)})`);
  }
  const duration = Date.now() - start;
  console.log(`reportSequential ใช้เวลา: ${duration} ms`);
  return duration;
}

// ส่วนที่ 2: ดึงพร้อมกัน (ขนาน)
async function reportParallel() {
  const start = Date.now();
  const ids = ["6501", "6501", "6501"];
  const promises = ids.map((id) => fetchStudentByIdAsync(id));
  const results = await Promise.all(promises);
  
  results.forEach((student) => {
    console.log(`[Parallel] พบ: ${student.name} (เกรด ${toGrade(student.score)})`);
  });

  const duration = Date.now() - start;
  console.log(`reportParallel ใช้เวลา: ${duration} ms`);
  return duration;
}

// ส่วนที่ 3: safeReport
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${toGrade(student.score)})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: <${error.message}>`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

// รันเรียงลำดับผ่าน main()
async function main() {
  console.log("=== ส่วนที่ 1: Sequential ===");
  const seqTime = await reportSequential();

  console.log("\n=== ส่วนที่ 2: Parallel ===");
  const parTime = await reportParallel();
  console.log(`เปรียบเทียบ: แบบขนานเร็วขึ้นประมาณ ${(seqTime / parTime).toFixed(1)} เท่า`);

  console.log("\n=== ส่วนที่ 3: safeReport ===");
  await safeReport("6501");
  await safeReport("9999");
}

main();

