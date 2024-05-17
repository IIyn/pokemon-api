import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { bag } from "@/infrastructure/data/schema";

export type Bag = InferSelectModel<typeof bag>;

export type NewBag = InferInsertModel<typeof bag>;

export type BagColumns = { [K in keyof Bag]?: boolean };
