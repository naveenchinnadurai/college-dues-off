import { Context } from 'hono';
import db from '../db_config/db';
import { students } from '../db_config/schema';
import { eq } from 'drizzle-orm';

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