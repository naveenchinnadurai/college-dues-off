import { createStudent, deleteStudent, getAllStudent, getStudentById, updateStudent } from '../controllers/student.controller';
import { Hono } from 'hono';

const router = new Hono();

router.post("/", createStudent);
router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router