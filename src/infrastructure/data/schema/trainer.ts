import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { users, pokemon } from "./";
import { relations } from "drizzle-orm";

export const trainer = pgTable("trainer", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
});

export const trainerPokemon = pgTable("trainer_pokemon", {
  id: uuid("uuid").defaultRandom().primaryKey(),
  trainerId: uuid("trainer_id")
    .notNull()
    .references(() => trainer.id),
  pokemonId: uuid("pokemon_id")
    .notNull()
    .references(() => pokemon.uuid),
});

export const trainerRelation = relations(trainer, ({ many }) => ({
  trainerPokemon: many(trainerPokemon),
}));

export const trainerPokemonRelation = relations(trainerPokemon, ({ one }) => ({
  trainer: one(trainer),
  pokemon: one(pokemon),
}));
