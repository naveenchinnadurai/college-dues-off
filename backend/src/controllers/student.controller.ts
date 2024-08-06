import { Context } from 'hono';
import db from '../db_config/db';
import { students } from '../db_config/schema';
import { eq } from 'drizzle-orm';

// Create a new student
export const createStudent = async (c: Context) => {
  const { regNo, rollNo, name, email, password, year, dept, parentsNo } = await c.req.json();

  console.log({ regNo, rollNo, name, email, password, year, dept, parentsNo });

  try {
    const newStudent = await db.insert(students).values({
      regNo,
      rollNo,
      name,
      email,
      password,
      parentsNo,
      dept,
      year,
    }).returning();

    return c.json({ isSuccess: true, students: newStudent });
  } catch (error) {
    console.log(error);
    return c.json({ isSuccess: false, error });
  }
};

// Get all students
export const getAllStudent = async (c: Context) => {
  try {
    const allStudents = await db.select().from(students);
    return c.json({ isSuccess: true, students: allStudents });
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};

// Get a student by Id
export const getStudentById = async (c: Context) => {
  const { id } = c.req.param();

  try {
    const student = await db.select().from(students).where(eq(students.regNo, id));
    if (student.length > 0) {
      return c.json({ isSuccess: true, students: student });
    } else {
      return c.json({ isSuccess: true, students: [] });
    }
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};

// Update a student
export const updateStudent = async (c: Context) => {
  const { id } = c.req.param();
  const { regNo, rollNo, name, email, password, year, dept, parentsNo } = await c.req.json();

  try {
    const updatedStudents = await db.update(students).set({
      regNo,
      rollNo,
      name,
      email,
      password,
      parentsNo,
      dept,
      year,
    }).where(eq(students.regNo, id)).returning();

    return c.json({ isSuccess: true, students: updatedStudents });
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};

// Delete a student
export const deleteStudent = async (c: Context) => {
  const { id } = c.req.param();

  try {
    const deletedStudents = await db.delete(students).where(eq(students.regNo, id)).returning();

    if (deletedStudents.length > 0) {
      return c.json({ isSuccess: true, students: deletedStudents });
    } else {
      return c.json({ isSuccess: false, students: [] });
    }
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};
