import { createStudent, deleteStudent, getAllStudent, getStudentById, updateStudent } from '../controllers/student.controller';
import express from "express";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router