ALTER TABLE "pokemon_evolutions" DROP CONSTRAINT "pokemon_evolutions_pokemon_id_pokemon_uuid_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_images" DROP CONSTRAINT "pokemon_images_pokemon_id_pokemon_uuid_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_profile" DROP CONSTRAINT "pokemon_profile_pokemon_id_pokemon_uuid_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_stats" DROP CONSTRAINT "pokemon_stats_pokemon_id_pokemon_uuid_fk";
--> statement-breakpoint
ALTER TABLE "pokemon_types" DROP CONSTRAINT "pokemon_types_pokemon_id_pokemon_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_evolutions" ADD CONSTRAINT "pokemon_evolutions_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_images" ADD CONSTRAINT "pokemon_images_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_profile" ADD CONSTRAINT "pokemon_profile_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_stats" ADD CONSTRAINT "pokemon_stats_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
