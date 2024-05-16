import {
  pgTable,
  varchar,
  jsonb,
  uuid,
  integer,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { trainerPokemon } from "./trainer";

export const pokemon = pgTable("pokemon", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  id: integer("id").notNull(),
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
    .references(() => pokemon.uuid),
});

export const pokemonProfile = pgTable("pokemon_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: uuid("pokemon_id")
    .notNull()
    .references(() => pokemon.uuid),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
  gender: varchar("gender", { length: 255 }).notNull(),
});

export const pokemonImages = pgTable("pokemon_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  pokemonId: uuid("pokemon_id")
    .notNull()
    .references(() => pokemon.uuid),
  sprite: varchar("sprite", { length: 255 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 255 }).notNull(),
  hires: varchar("hires", { length: 255 }).notNull(),
});

export const pokemonEvolutions = pgTable("pokemon_evolutions", {
  id: uuid("id").defaultRandom().primaryKey(),
  previous: uuid("previous").references(() => pokemon.uuid),
  next: uuid("next").references(() => pokemon.uuid),
  prevLevel: integer("prev_level"),
  nextLevel: integer("next_level"),
});

/* 
████████╗██╗   ██╗██████╗ ███████╗███████╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
   ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
   ██║      ██║   ██║     ███████╗███████║
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
*/

export const typeEnum = pgEnum("type_enum", [
  "Grass",
  "Poison",
  "Fire",
  "Flying",
  "Water",
  "Bug",
  "Normal",
  "Electric",
  "Ground",
  "Fairy",
  "Fighting",
  "Psychic",
  "Rock",
  "Steel",
  "Ice",
  "Ghost",
  "Dragon",
  "Dark",
]);

export const type = pgTable("types", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: typeEnum("type").notNull().unique(),
});

// relationship table between pokemon and types
export const pokemonTypes = pgTable(
  "pokemon_types",
  {
    pokemonId: uuid("pokemon_id")
      .notNull()
      .references(() => pokemon.uuid),
    typeId: uuid("type_id")
      .notNull()
      .references(() => type.id),
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
