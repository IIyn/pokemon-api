import {
  pgTable,
  varchar,
  uuid,
  integer,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { trainerPokemon } from "./trainer";

export const pokemon = pgTable("pokemon", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  id: integer("id").notNull().unique(),
  species: varchar("species", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
});

export const pokemonStats = pgTable("pokemon_stats", {
  id: uuid("id").defaultRandom().primaryKey(),
  hp: integer("hp").notNull(),
  attack: integer("attack").notNull(),
  defense: integer("defense").notNull(),
  specialAttack: integer("special_attack").notNull(),
  specialDefense: integer("special_defense").notNull(),
  pokemonId: uuid("pokemon_id")
    .notNull()
    .references(() => pokemon.uuid, { onDelete: "cascade" }),
});

export const pokemonProfile = pgTable("pokemon_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: uuid("pokemon_id")
    .notNull()
    .references(() => pokemon.uuid, { onDelete: "cascade" }),
  height: varchar("height", { length: 255 }).notNull(),
  weight: varchar("weight", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 255 }).notNull(),
});

export const pokemonImages = pgTable("pokemon_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: uuid("pokemon_id")
    .notNull()
    .references(() => pokemon.uuid, { onDelete: "cascade" }),
  sprite: varchar("sprite", { length: 255 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
  hires: varchar("hires", { length: 255 }).notNull(),
});

export const pokemonEvolutions = pgTable("pokemon_evolutions", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: uuid("pokemon_id")
    .references(() => pokemon.uuid, { onDelete: "cascade" })
    .notNull(),
  previous: integer("previous").references(() => pokemon.id, {
    onDelete: "cascade",
  }),
  next: integer("next").references(() => pokemon.id, { onDelete: "cascade" }),
  prevLevel: varchar("prev_level", { length: 255 }),
  nextLevel: varchar("next_level", { length: 255 }),
});

/* 
████████╗██╗   ██╗██████╗ ███████╗███████╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
   ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
   ██║      ██║   ██║     ███████╗███████║
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
*/

// export const typeEnum = pgEnum("type_enum", [
//   "Grass",
//   "Poison",
//   "Fire",
//   "Flying",
//   "Water",
//   "Bug",
//   "Normal",
//   "Electric",
//   "Ground",
//   "Fairy",
//   "Fighting",
//   "Psychic",
//   "Rock",
//   "Steel",
//   "Ice",
//   "Ghost",
//   "Dragon",
//   "Dark",
// ]);

export const type = pgTable("types", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: varchar("type", { length: 255 }).notNull().unique(),
});

// relationship table between pokemon and types
export const pokemonTypes = pgTable(
  "pokemon_types",
  {
    pokemonId: uuid("pokemon_id")
      .notNull()
      .references(() => pokemon.uuid, { onDelete: "cascade" }),
    typeId: uuid("type_id")
      .notNull()
      .references(() => type.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.pokemonId, t.typeId] }),
  })
);

/*
██████╗ ███████╗██╗      █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔══██╗██╔════╝██║     ██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
██████╔╝█████╗  ██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══██╗██╔══╝  ██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║  ██║███████╗███████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/

export const pokemonRelations = relations(pokemon, ({ many }) => ({
  pokemonTypes: many(pokemonTypes),
  trainerPokemon: many(trainerPokemon),
}));

export const typeRelations = relations(type, ({ many }) => ({
  pokemonTypes: many(pokemonTypes),
}));

export const pokemonTypesRelations = relations(pokemonTypes, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonTypes.pokemonId],
    references: [pokemon.uuid],
  }),
  type: one(type, {
    fields: [pokemonTypes.typeId],
    references: [type.id],
  }),
}));
