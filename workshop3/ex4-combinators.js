const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// ฟังก์ชั่นช่วยสร้าง Timeout สำหรับสถานการณ์ที่ 4
const timeoutPromise = (ms) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

async function main() {
  console.log("=== สถานการณ์ที่ 1: หน้าแรก ===");
  // เหตุผลที่เลือก Promise.all: ต้องการข้อมูลครบทุกส่วน หากมีหน้าใดล้มเหลว จะต้องแสดงหน้า Error รวมทันที
  const runScenario1 = async (failProfile = false) => {
    try {
      const results = await Promise.all([
        wait(300, "โปรไฟล์", failProfile),
        wait(400, "ตารางเรียน"),
        wait(500, "ประกาศ")
      ]);
      console.log(`เปิดหน้าแรก: ${results.join(" + ")}`);
    } catch (err) {
      console.log(`หน้าแรกเปิดไม่ได้: <${err.message}>`);
    }
  };
  await runScenario1(false); // แบบปกติ
  await runScenario1(true);  // แบบ willFail = true

  console.log("\n=== สถานการณ์ที่ 2: แจ้งเตือนผลสอบ ===");
  // เหตุผลที่เลือก Promise.allSettled: ต้องการส่งและรายงานผลครบทุกช่องทาง ช่องที่ล้มเหลวต้องไม่ทำให้รายงานส่วนอื่นพัง
  const notifications = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true), // ส้ม
    wait(400, "แอป")
  ]);
  notifications.forEach((res, i) => {
    const channel = ["อีเมล", "SMS", "แอป"][i];
    if (res.status === "fulfilled") {
      console.log(`ส่ง ${channel} สำเร็จ: ${res.value}`);
    } else {
      console.log(`ส่ง ${channel} ไม่สำเร็จ: ${res.reason.message}`);
    }
  });

  console.log("\n=== สถานการณ์ที่ 3: Mirror Server ===");
  // เหตุผลที่เลือก Promise.any: ดึงข้อมูลจากหลายแหล่ง ขอเพียงตัวแรกที่สำเร็จ ไม่สนใจตัวที่ล้มเหลว
  try {
    const data = await Promise.any([
      wait(300, "ข้อมูลจาก mirror-A", true), // ล้มเหลว
      wait(600, "ข้อมูลจาก mirror-B")
    ]);
    console.log(`ใช้ข้อมูลจาก: ... (${data})`);
  } catch (err) {
    console.log("ไม่มี server ใดตอบกลับสำเร็จ");
  }

  console.log("\n=== สถานการณ์ที่ 4: ค้นหาฐานข้อมูล + Timeout ===");
  // เหตุผลที่เลือก Promise.race: แข่งขันระหว่างการค้นหากับเวลาถอยหลัง (Timeout) ตัวไหนจบก่อนถือเอาผลลัพธ์ตัวนั้น
  try {
    const result = await Promise.race([
      wait(1200, "ข้อมูลใหม่จาก DB"),
      timeoutPromise(800)
    ]);
    console.log(`ผลการค้นหา: ${result}`);
  } catch (err) {
    console.log("เกิน 800ms -> เลิกรอ -> ใช้แคชเก่าแทน");
  }
}

main();