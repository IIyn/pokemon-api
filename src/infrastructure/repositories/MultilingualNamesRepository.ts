import {
  MultilingualNames,
  NewMultilingualNames,
  MultilingualNamesColumns,
} from "@/domain/entities/MultilingualNames";
import { db } from "@/infrastructure/data";
import { eq } from "drizzle-orm";
import { multilingualNames } from "@/infrastructure/data/schema";

/**
 * MultilingualNames repository
 * @class
 * @public
 */
export class MultilingualNamesRepository {
  /**
   * Get a multilingual name by id
   */
  getMultilingualNameById(
    id: string,
    columns: MultilingualNamesColumns
  ): Promise<any> {
    try {
      return db.query.multilingualNames.findFirst({
        where: eq(multilingualNames.id, id),
        columns,
      });
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le nom multilingue");
    }
  }

  /**
   * Get all multilingual names
   */
  getAllMultilingualNames(): Promise<any> {
    try {
      return db
        .query.multilingualNames.findMany({
          columns: {
            id: true,
            name: true,
          },
        })
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les noms multilingues");
    }
  }

  /**
   * Create a new multilingual name
   */
  createMultilingualName(
    newMultilingualName: NewMultilingualNames
  ): Promise<any> {
    try {
      return db
        .insert(multilingualNames)
        .values(newMultilingualName)
        .returning({ id: multilingualNames.id })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le nom multilingue");
    }
  }

  /**
   * Update a multilingual name
   */
  updateMultilingualName(
    updatedMultilingualNames: MultilingualNames
  ): Promise<any> {
    try {
      return db
        .update(multilingualNames)
        .set(updatedMultilingualNames)
        .where(eq(multilingualNames.id, updatedMultilingualNames.id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de mettre à jour le nom multilingue");
    }
  }
}
