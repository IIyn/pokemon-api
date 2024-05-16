import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { multilingualNames } from "@/infrastructure/data/schema";

export type MultilingualNames = InferSelectModel<typeof multilingualNames>;

export type NewMultilingualNames = InferInsertModel<typeof multilingualNames>;

export type MultilingualNamesColumns = {
  [K in keyof MultilingualNames]?: boolean;
};

export enum LanguagesEnum {
  English = "english",
  Japanese = "japanese",
  Chinese = "chinese",
  French = "french",
}
