import { createStaff, deleteStaff, getAllStaff, getStaffById, updateStaff } from '../controllers/staffs.controller';
import express from "express";

const router = express.Router();

router.post("/", createStaff);
router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router