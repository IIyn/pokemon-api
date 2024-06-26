import { Item, NewItem, ItemColumns } from "@/domain/entities/Item";
import { db } from "@/infrastructure/data";
import { eq } from "drizzle-orm";
import { item, multilingualNames } from "@/infrastructure/data/schema";
import { MultilingualNamesRepository } from "./MultilingualNamesRepository";
import { NewMultilingualNames } from "@/domain/entities/MultilingualNames";

/**
 * Item repository
 * @class
 * @public
 */
export class ItemRepository {
  multilingualNamesRepository: MultilingualNamesRepository;

  constructor() {
    this.multilingualNamesRepository = new MultilingualNamesRepository();
  }

  /**
   * Get an item by id
   */
  getItemById(id: string): Promise<any> {
    try {
      return db
        .select({
          id: item.id,
          type: item.type,
          description: item.description,
          multilingualNames: {
            name: multilingualNames.name,
            language: multilingualNames.language,
          },
        })
        .from(item)
        .leftJoin(multilingualNames, eq(item.uuid, multilingualNames.itemId))
        .where(eq(item.uuid, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer l'item");
    }
  }

  /**
   * Get all items
   */
  getAllItems(): Promise<any> {
    try {
      return db
        .select({
          id: item.id,
          type: item.type,
          description: item.description,
          multilingualNames: {
            name: multilingualNames.name,
            language: multilingualNames.language,
          },
        })
        .from(item)
        .leftJoin(multilingualNames, eq(item.uuid, multilingualNames.itemId))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les items");
    }
  }

  /**
   * Create an item
   */
  createItem(newItem: NewItem, names: NewMultilingualNames[]): Promise<any> {
    try {
      for (const name of names) {
        this.multilingualNamesRepository.createMultilingualName({
          ...name,
          itemId: newItem.uuid,
        });
      }
      return db.insert(item).values(newItem).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer l'item");
    }
  }
}
