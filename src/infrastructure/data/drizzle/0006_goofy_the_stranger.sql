ALTER TABLE "bag" RENAME COLUMN "user_id" TO "trainer_id";--> statement-breakpoint
ALTER TABLE "bag" DROP CONSTRAINT "bag_user_id_trainer_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bag" ADD CONSTRAINT "bag_trainer_id_trainer_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
