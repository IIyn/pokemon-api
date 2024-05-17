import { pgTable, varchar, uuid, pgEnum } from "drizzle-orm/pg-core";
import { pokemon, item } from "./";

export const languagesEnum = pgEnum("languages", [
  "english",
  "japanese",
  "chinese",
  "french",
]);

export const multilingualNames = pgTable("multilingual_names", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),

  language: languagesEnum("language").notNull(),
  // language: varchar("language", { length: 255 }).notNull(),

  pokemonId: uuid("pokemon_id").references(() => pokemon.uuid, {
    onDelete: "cascade",
  }),
  itemId: uuid("item_id").references(() => item.uuid),
});
