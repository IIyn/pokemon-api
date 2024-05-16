ALTER TABLE "pokemon_evolutions" DROP CONSTRAINT "pokemon_evolutions_previous_pokemon_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_evolutions" ADD CONSTRAINT "pokemon_evolutions_previous_pokemon_id_fk" FOREIGN KEY ("previous") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
