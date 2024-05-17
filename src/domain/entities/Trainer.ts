import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { trainer } from "@/infrastructure/data/schema";

export type Trainer = InferSelectModel<typeof trainer>;

export type NewTrainer = InferInsertModel<typeof trainer>;

export type TrainerColumns = { [K in keyof Trainer]?: boolean };
