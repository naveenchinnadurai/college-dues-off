import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const staffs = pgTable("staffs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: text("role").array(),
  advisorFor: text("advisor_for"),
  subjectTaking: text("subject_taking").array()
});
