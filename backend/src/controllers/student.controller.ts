import { Request, Response } from "express";
import db from "../db_config/db";
import { students } from "../db_config/schema";
import { eq } from "drizzle-orm";

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
    const { regNo, rollNo, name, email, password, year, dept, parentsNo } = req.body;

    console.log({ regNo, rollNo, name, email, password, year, dept, parentsNo })

    try {
        const newStudent = await db.insert(students).values({
            regNo,
            rollNo,
            name,
            email,
            password,
            parentsNo,
            dept,
            year
        }).returning();

        res.json({ isSuccess: true, students: newStudent });
    } catch (error) {
        res.json({ isSuccess: false, error });
        console.log(error)
    }
};

// Get all student
export const getAllStudent = async (req: Request, res: Response) => {
    try {
        const allStudents = await db.select().from(students);
        res.json({ isSuccess: true, students: allStudents });
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};

// Get a student by Id
export const getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const student = await db.select().from(students).where(eq(students.regNo, id));
        if (student) {
            res.json({ isSuccess: true, students: student });
        } else {
            res.json({ isSuccess: true, students: [] });
        }
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { regNo, rollNo, name, email, password, year, dept, parentsNo } = req.body;

    try {
        const updatedStudents = await db.update(students).set({
            regNo,
            rollNo,
            name,
            email,
            password,
            parentsNo,
            dept,
            year
        }).where(eq(students.regNo, id)).returning();

        res.json({ isSuccess: true, students: updatedStudents });
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedStudents = await db.delete(students).where(eq(students.regNo, id)).returning();

        if (deletedStudents) {
            res.json({ isSuccess: true, students: deletedStudents });
        } else {
            res.json({ isSuccess: false, students: [] });
        }
    } catch (error) {
        res.json({ isSuccess: false, error });
    }
};
