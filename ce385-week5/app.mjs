import express from "express";

const app = express();

// รองรับการอ่านข้อมูลแบบ JSON จาก Request Body
app.use(express.json());

// ข้อมูลจำลอง
const TODOS = [
    { id: "1", title: "อ่านสไลด์สัปดาห์ที่ 5", done: true, priority: "high" },
    { id: "2", title: "ติดตั้ง Express", done: true, priority: "high" },
    { id: "3", title: "ทำ Workshop 4", done: false, priority: "normal" },
    { id: "4", title: "เตรียมสอบกลางภาค", done: false, priority: "low" },
];

const PRIORITIES = ["high", "normal", "low"];

// Middleware ตรวจสอบความถูกต้องของข้อมูลก่อนสร้าง Todo
function validateTodo(req, res, next) {
    const { title, priority } = req.body ?? {};

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" });
    }

    if (priority !== undefined && !PRIORITIES.includes(priority)) {
        return res.status(400).json({ error: "priority ไม่ถูกต้อง" });
    }

    return next();
}

// สร้าง Express Router
const todoRouter = express.Router();

// 1. GET /api/v1/todos - ดึงรายการทั้งหมด
todoRouter.get("/", (req, res) => {
    res.json(TODOS.map((t) => ({ ...t })));
});

// 2. GET /api/v1/todos/:id - ดึงรายการเฉพาะตาม ID
todoRouter.get("/:id", (req, res) => {
    const todo = TODOS.find((t) => t.id === req.params.id);

    if (!todo) {
        return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
    }

    return res.status(200).json({ ...todo });
});

// 3. POST /api/v1/todos - เพิ่มรายการใหม่
todoRouter.post("/", validateTodo, (req, res) => {
    const created = {
        id: String(TODOS.length + 1),
        title: req.body.title,
        done: false,
        priority: req.body.priority ?? "normal",
    };
    TODOS.push(created);
    res.status(201).json(created);
});

// นำ Router มาใช้กับ Base Path /api/v1/todos
app.use("/api/v1/todos", todoRouter);

// เริ่มต้นรันเซิร์ฟเวอร์
app.listen(3000, () => {
    console.log(`เซิร์ฟเวอร์ทำงานที่ http://localhost:3000`);
});