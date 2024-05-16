import { ItemRepository } from "@/infrastructure/repositories/ItemRepository";
import fs from "fs";
import path from "path";
import {
  LanguagesEnum,
  NewMultilingualNames,
} from "../entities/MultilingualNames";

/**
 * Item service
 * @class
 * @public
 */
export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();

    // set up items in your db, uncomment this code to store the items in your db

    // this.storeJSONinDB();
  }

  private fromJSON() {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "infrastructure",
      "data",
      "json",
      "items.json"
    );
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }

  private async storeJSONinDB() {
    const items = this.fromJSON();
    items.forEach(async (item: any) => {
      const names = item.name;
      const enumedNames: NewMultilingualNames[] = [
        {
          name: names.japanese || "",
          language: LanguagesEnum.Japanese,
        },
        {
          name: names.chinese || "",
          language: LanguagesEnum.Chinese,
        },
        {
          name: names.french || "",
          language: LanguagesEnum.French,
        },
        {
          name: names.english || "",
          language: LanguagesEnum.English,
        },
      ];
      await this.itemRepository.createItem(item, enumedNames);
    });
  }
}
