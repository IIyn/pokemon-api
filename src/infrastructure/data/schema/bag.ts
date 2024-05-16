import { pgTable, uuid } from "drizzle-orm/pg-core";
import { trainer, item } from "./";
import { relations } from "drizzle-orm";

export const bag = pgTable("bag", {
  id: uuid("id").defaultRandom().primaryKey(),
  trainerId: uuid("trainer_id")
    .notNull()
    .references(() => trainer.id),
});

export const bagitem = pgTable("bag_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  bagId: uuid("bag_id")
    .notNull()
    .references(() => bag.id),
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.uuid),
});

export const bagRelation = relations(bag, ({ many }) => ({
  bagitem: many(bagitem),
}));

export const bagitemRelation = relations(bagitem, ({ one }) => ({
  bag: one(bag),
  item: one(item),
}));
