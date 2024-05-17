ALTER TABLE "multilingual_names" DROP CONSTRAINT "multilingual_names_pokemon_id_pokemon_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multilingual_names" ADD CONSTRAINT "multilingual_names_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
