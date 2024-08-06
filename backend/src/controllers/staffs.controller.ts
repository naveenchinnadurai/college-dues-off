import { Context } from 'hono';
import db from '../db_config/db';
import { staffs } from '../db_config/schema';
import { eq } from 'drizzle-orm';

// Create a new staff member
export const createStaff = async (c: Context) => {
  const { name, email, password, role, advisorFor, subjectTaking } = await c.req.json();

  try {
    const newStaff = await db.insert(staffs).values({
      name,
      email,
      password,
      role,
      advisorFor,
      subjectTaking,
    }).returning();

    return c.json({ isSuccess: true, staff: newStaff });
  } catch (error) {
    console.log(error);
    return c.json({ isSuccess: false, error });
  }
};

// Get all staff members
export const getAllStaff = async (c: Context) => {
  try {
    const allStaffs = await db.select().from(staffs);
    return c.json({ isSuccess: true, staffs: allStaffs });
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};

// Get a staff member by Id
export const getStaffById = async (c: Context) => {
  const { id } = c.req.param();

  try {
    const staff = await db.select().from(staffs).where(eq(staffs.id, id));
    if (staff.length > 0) {
      return c.json({ isSuccess: true, staffs: staff });
    } else {
      return c.json({ isSuccess: true, staffs: [] });
    }
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};

// Update a staff member
export const updateStaff = async (c: Context) => {
  const { id } = c.req.param();
  const { name, email, password, role, advisorFor, subjectTaking } = await c.req.json();

  try {
    const updatedStaff = await db.update(staffs).set({
      name,
      email,
      password,
      role,
      advisorFor,
      subjectTaking,
    }).where(eq(staffs.id, id)).returning();

    return c.json({ isSuccess: true, staff: updatedStaff });
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};

// Delete a staff member
export const deleteStaff = async (c: Context) => {
  const { id } = c.req.param();

  try {
    const deletedStaff = await db.delete(staffs).where(eq(staffs.id, id)).returning();

    if (deletedStaff.length > 0) {
      return c.json({ isSuccess: true, staffs: deletedStaff });
    } else {
      return c.json({ isSuccess: true, staffs: [] });
    }
  } catch (error) {
    return c.json({ isSuccess: false, error });
  }
};
