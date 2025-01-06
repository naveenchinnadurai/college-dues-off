import { Context } from 'hono';
import db from '../db_config/db';
import { students, staffs } from '../db_config/schema';
import { eq } from 'drizzle-orm';

// Student login
export const studentLogin = async (c: Context) => {
    const { regNo, password } = await c.req.json();
    console.log({regNo,password})

    try {
        // Find student by regNo
        const student = await db.select().from(students).where(eq(students.regNo,regNo));

        console.log(student.password," ",password)
        if (!student || student.password !== password) {    // Check if student exists and password matches
            return c.json({ message: 'Invalid credentials' }, 401);
        }

        return c.json( {info:student}, 200); //return student data
    } catch (error) {
        return c.json({ message: 'Server error', error }, 500);
    }
};

// Staff login
export const staffLogin = async (c: Context) => {
    const { staffId, password } = await c.req.json();

    try {
        // Find staff by staffId
        const staff = await db.select().from(staffs).where(eq(staffs.id,staffId));

        // Check if staff exists and password matches
        if (!staff || staff.password !== password) {
            return c.json({ message: 'Invalid credentials' }, 401);
        }

        return c.json({ info:staff }, 200);
    } catch (error) {
        return c.json({ message: 'Server error', error }, 500);
    }
};
