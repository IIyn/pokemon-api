DO $$ BEGIN
 CREATE TYPE "public"."languages" AS ENUM('english', 'japanese', 'chinese', 'french');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type_enum" AS ENUM('Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug', 'Normal', 'Electric', 'Ground', 'Fairy', 'Fighting', 'Psychic', 'Rock', 'Steel', 'Ice', 'Ghost', 'Dragon', 'Dark');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bag_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bag_id" uuid NOT NULL,
	"item_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id" integer NOT NULL,
	"type" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multilingual_names" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"language" "languages" NOT NULL,
	"pokemon_id" uuid,
	"item_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id" integer NOT NULL,
	"species" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	CONSTRAINT "pokemon_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_evolutions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pokemon_id" uuid NOT NULL,
	"previous" integer,
	"next" integer,
	"prev_level" varchar(255),
	"next_level" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pokemon_id" uuid NOT NULL,
	"sprite" varchar(255) NOT NULL,
	"thumbnail" varchar(255) NOT NULL,
	"hires" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pokemon_id" uuid NOT NULL,
	"height" varchar(255) NOT NULL,
	"weight" varchar(255) NOT NULL,
	"gender" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hp" integer NOT NULL,
	"attack" integer NOT NULL,
	"defense" integer NOT NULL,
	"special_attack" integer NOT NULL,
	"special_defense" integer NOT NULL,
	"pokemon_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_types" (
	"pokemon_id" uuid NOT NULL,
	"type_id" uuid NOT NULL,
	CONSTRAINT "pokemon_types_pokemon_id_type_id_pk" PRIMARY KEY("pokemon_id","type_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainer_pokemon" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trainer_id" uuid NOT NULL,
	"pokemon_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "type_enum" NOT NULL,
	CONSTRAINT "types_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"refresh_token" varchar(255)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bag" ADD CONSTRAINT "bag_user_id_trainer_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."trainer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bag_item" ADD CONSTRAINT "bag_item_bag_id_bag_id_fk" FOREIGN KEY ("bag_id") REFERENCES "public"."bag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bag_item" ADD CONSTRAINT "bag_item_item_id_item_uuid_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multilingual_names" ADD CONSTRAINT "multilingual_names_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multilingual_names" ADD CONSTRAINT "multilingual_names_item_id_item_uuid_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_evolutions" ADD CONSTRAINT "pokemon_evolutions_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_evolutions" ADD CONSTRAINT "pokemon_evolutions_previous_pokemon_id_fk" FOREIGN KEY ("previous") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_evolutions" ADD CONSTRAINT "pokemon_evolutions_next_pokemon_id_fk" FOREIGN KEY ("next") REFERENCES "public"."pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_images" ADD CONSTRAINT "pokemon_images_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_profile" ADD CONSTRAINT "pokemon_profile_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_stats" ADD CONSTRAINT "pokemon_stats_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_types" ADD CONSTRAINT "pokemon_types_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainer" ADD CONSTRAINT "trainer_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainer_pokemon" ADD CONSTRAINT "trainer_pokemon_trainer_id_trainer_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."trainer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainer_pokemon" ADD CONSTRAINT "trainer_pokemon_pokemon_id_pokemon_uuid_fk" FOREIGN KEY ("pokemon_id") REFERENCES "public"."pokemon"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
