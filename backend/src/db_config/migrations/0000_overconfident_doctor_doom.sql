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
