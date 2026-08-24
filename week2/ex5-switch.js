// ใช้ switch case ในการคืนค่าราคาและตัวคูณขนาดอาหาร

// ส่วนที่ 1 — ฟังก์ชันดึงราคาอาหาร (getMenuPrice)
function getMenuPrice(menu) {
  switch (menu) {
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
    case "ข้าวผัด": // รวม 3 เมนูราคา 50 บาทไว้ด้วยกัน (จงใจใช้ fall-through)
      return 50;
    case "ผัดไทย":
      return 60;
    case "ต้มยำกุ้ง":
      return 120;
    default:
      return 0; // กรณีไม่มีในรายการ
  }
}

// ส่วนที่ 2 — ฟังก์ชันดึงตัวคูณขนาดอาหาร (getSizeMultiplier)
function getSizeMultiplier(size) {
  switch (size) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      return 1; // อื่น ๆ ให้คืนค่าเป็น 1
  }
}

// ส่วนที่ 3 — คำนวณราคารวมของออเดอร์
const orders = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ข้าวมันไก่", size: "ธรรมดา", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวหมูแดง", size: "พิเศษ", qty: 3 },
  { menu: "ชาไทย", size: "ธรรมดา", qty: 2 } // ทดสอบเมนูที่ไม่มีในรายการ (default)
];

let grandTotal = 0;

console.log("===== รายการสั่งอาหาร =====");

for (const item of orders) {
  const basePrice = getMenuPrice(item.menu);
  const multiplier = getSizeMultiplier(item.size);
  const itemTotal = basePrice * multiplier * item.qty;

  grandTotal += itemTotal;

  console.log(`${item.menu} (${item.size}) x${item.qty} = ${itemTotal} บาท`);
}

console.log("---------------------------");
console.log(`ราคารวมทั้งสิ้น: ${grandTotal} บาท`);
console.log("===========================");