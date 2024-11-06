import {  getAllStudent, getStudentById, updateStudent } from '../controllers/student.controller';
import { Hono } from 'hono';

const router = new Hono();

router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);

export default router