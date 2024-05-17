import { Bag, NewBag, BagColumns } from "@/domain/entities/Bag";
import { db } from "@/infrastructure/data";
import { eq, and } from "drizzle-orm";
import { bag, bagitem, trainer } from "@/infrastructure/data/schema";

/**
 * Bag repository
 * @class
 * @public
 */
export class BagRepository {
  /**
   * Get a bag by id
   */
  getBagById(id: string): Promise<any> {
    try {
      return db
        .select({
          id: bag.id,
          trainerId: bag.trainerId,
          bagitem: {
            id: bagitem.id,
            bagId: bagitem.bagId,
            itemId: bagitem.itemId,
          },
          trainer: {
            id: trainer.id,
            userId: trainer.userId,
            name: trainer.name,
          },
        })
        .from(bag)
        .leftJoin(bagitem, eq(bag.id, bagitem.bagId))
        .leftJoin(trainer, eq(bag.trainerId, trainer.id))
        .where(eq(bag.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le sac");
    }
  }

  /**
   * Get a bag by trainerId
   */
  getBagByTrainerId(trainerId: string): Promise<any> {
    try {
      return db
        .select({
          id: bag.id,
          trainerId: bag.trainerId,
          bagitem: {
            id: bagitem.id,
            bagId: bagitem.bagId,
            itemId: bagitem.itemId,
          },
          trainer: {
            id: trainer.id,
            userId: trainer.userId,
            name: trainer.name,
          },
        })
        .from(bag)
        .leftJoin(bagitem, eq(bag.id, bagitem.bagId))
        .leftJoin(trainer, eq(bag.trainerId, trainer.id))
        .where(eq(bag.trainerId, trainerId))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le sac");
    }
  }

  /**
   * Add a bag
   */
  addBag(newBag: NewBag) {
    try {
      return db.insert(bag).values(newBag).returning({ id: bag.id }).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible d'ajouter le sac");
    }
  }

  addBagItem(bagId: string, itemId: string) {
    try {
      return db
        .insert(bagitem)
        .values({ bagId, itemId })
        .returning({ id: bagitem.id })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible d'ajouter l'item au sac");
    }
  }

  /**
   * Update a bag
   */
  updateBag(bagToUpdate: Bag) {
    try {
      return db
        .update(bag)
        .set(bagToUpdate)
        .where(eq(bag.id, bagToUpdate.id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de mettre à jour le sac");
    }
  }

  /**
   * Delete a bag
   */
  deleteBag(id: string): void {
    try {
      db.delete(bagitem).where(eq(bagitem.bagId, id)).execute();
      db.delete(bag).where(eq(bag.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le sac");
    }
  }

  deleteBagItem(bagId: string, itemId: string): void {
    try {
      db.delete(bagitem)
        .where(and(eq(bagitem.bagId, bagId), eq(bagitem.itemId, itemId)))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer l'item du sac");
    }
  }
}
