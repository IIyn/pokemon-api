import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { item } from "@/infrastructure/data/schema";

export type Item = InferSelectModel<typeof item>;

export type NewItem = InferInsertModel<typeof item>;

export type ItemColumns = { [K in keyof Item]?: boolean };
