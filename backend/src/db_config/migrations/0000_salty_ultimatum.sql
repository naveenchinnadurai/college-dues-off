CREATE TABLE IF NOT EXISTS "staffs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text[],
	"advisor_for" text,
	"subject_taking" text[],
	CONSTRAINT "staffs_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"reg_no" text PRIMARY KEY NOT NULL,
	"roll_no" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"parents_no" text NOT NULL,
	"password" text NOT NULL,
	"dept" text[],
	"year" text,
	CONSTRAINT "students_roll_no_unique" UNIQUE("roll_no"),
	CONSTRAINT "students_email_unique" UNIQUE("email"),
	CONSTRAINT "students_parents_no_unique" UNIQUE("parents_no")
);
