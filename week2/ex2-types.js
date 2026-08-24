// Workshop 1 - ข้อที่ 2: ชนิดข้อมูลและ typeof
// ประกาศตัวแปรและแสดงผลข้อมูลพร้อมชนิดข้อมูล

// ==================== ส่วนที่ 1 ====================
const strVar = "สวัสดี";
const numVar = 100;
const boolVar = true;
let undefVar;
const nullVar = null;
const arrayVar = [1, 2, 3];

console.log(`ค่า: ${strVar} | ชนิด: ${typeof strVar}`);
console.log(`ค่า: ${numVar} | ชนิด: ${typeof numVar}`);
console.log(`ค่า: ${boolVar} | ชนิด: ${typeof boolVar}`);
console.log(`ค่า: ${undefVar} | ชนิด: ${typeof undefVar}`);
console.log(`ค่า: ${nullVar} | ชนิด: ${typeof nullVar}`);
console.log(`ค่า: ${arrayVar} | ชนิด: ${typeof arrayVar}`);

// ==================== ส่วนที่ 2 ====================
// typeof null ได้ "object" ซึ่งไม่ถูกต้องตามความเป็นจริง (เป็นบั๊กประวัติศาสตร์ของ JavaScript)
console.log(`typeof null ได้ผลว่า: ${typeof nullVar} (ไม่ถูกต้องตามความเป็นจริง เพราะ null ควรเป็น Primitive type)`);

// ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิดเป็น undefined
let unassignedVar;
console.log(`ตัวแปรที่ยังไม่กำหนดค่า มีชนิดเป็น: ${typeof unassignedVar}`);

// typeof NaN
const nanVar = Number("abc");
console.log(`typeof NaN ได้ผลว่า: ${typeof nanVar}`);

// ==================== ส่วนที่ 3 ====================
const inputAge = "20";
const inputScore = "85.5";

// แปลง inputAge เป็นตัวเลขแล้วบวก 5
const ageNum = Number(inputAge) + 5;
console.log(`ผลบวกอายุ: ${ageNum}`); // ได้ 25

// แปลง inputScore แล้วแสดงผลทศนิยม 1 ตำแหน่ง
const scoreNum = Number(inputScore).toFixed(1);
console.log(`คะแนนทศนิยม 1 ตำแหน่ง: ${scoreNum}`); // ได้ "85.5"

// เปรียบเทียบ inputAge === 20 กับ Number(inputAge) === 20
console.log(`inputAge === 20 ได้ผลลัพธ์: ${inputAge === 20}`); // false เพราะ String !== Number
console.log(`Number(inputAge) === 20 ได้ผลลัพธ์: ${Number(inputAge) === 20}`); // true เพราะเปลี่ยนเป็น Number แล้ว