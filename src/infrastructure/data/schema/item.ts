import { pgTable, varchar, uuid, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { bagitem } from "./bag";

export const item = pgTable("item", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  id: integer("id").notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
});

export const itemRelation = relations(item, ({ many }) => ({
  bagitem: many(bagitem),
}));
