import { Request, Response } from "express";
import db from "../db_config/db";
import { staffs } from "../db_config/schema";
import { eq } from "drizzle-orm";

// Create a new staff member
export const createStaff = async (req: Request, res: Response) => {
    const { name, email, password, role, advisorFor, subjectTaking } = req.body;

    try {
        const newStaff = await db.insert(staffs).values({
            name,
            email,
            password,
            role,
            advisorFor,
            subjectTaking
        }).returning();

        res.json({ isSuccess: true, staff: newStaff });
    } catch (error) {
        res.json({ isSuccess: false, error });
        console.log(error)
    }
};

// Get all staff members
export const getAllStaff = async (req: Request, res: Response) => {
    try {
        const allStaffs = await db.select().from(staffs);
        res.json({ isSuccess: true, staffs: allStaffs });
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};

// Get a staff member by Id
export const getStaffById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const staff = await db.select().from(staffs).where(eq(staffs.id, id));
        if (staff) {
            res.json({ isSuccess: true, staffs: staff });
        } else {
            res.json({ isSuccess: true, staffs: [] });
        }
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};

// Update a staff member
export const updateStaff = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, role, advisorFor, subjectTaking } = req.body;

    try {
        const updatedStaff = await db.update(staffs).set({
            name,
            email,
            password,
            role,
            advisorFor,
            subjectTaking
        }).where(eq(staffs.id, id)).returning();

        res.json({ isSuccess: true, staff: updateStaff });
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};

// Delete a staff member
export const deleteStaff = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedStaff = await db.delete(staffs).where(eq(staffs.id, id)).returning();

        if (deletedStaff) {
            res.json({ isSuccess: true, staffs: deletedStaff });
        } else {
            res.json({ isSuccess: true, staffs: [] });
        }
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};
