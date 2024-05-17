import { Trainer, NewTrainer, TrainerColumns } from "@/domain/entities/Trainer";
import { db } from "@/infrastructure/data";
import { eq, and } from "drizzle-orm";
import { trainer, trainerPokemon, users } from "@/infrastructure/data/schema";

/**
 * Trainer repository
 * @class
 * @public
 */
export class TrainerRepository {
  /**
   * Get a trainer by id
   */
  getTrainerById(id: string): Promise<any> {
    try {
      return db
        .select({
          id: trainer.id,
          userId: trainer.userId,
          name: trainer.name,
          trainerPokemon: {
            id: trainerPokemon.id,
            trainerId: trainerPokemon.trainerId,
            pokemonId: trainerPokemon.pokemonId,
          },
          users: {
            id: users.id,
            username: users.username,
          },
        })
        .from(trainer)
        .leftJoin(trainerPokemon, eq(trainer.id, trainerPokemon.trainerId))
        .leftJoin(users, eq(trainer.userId, users.id))
        .where(eq(trainer.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le dresseur");
    }
  }

  /**
   * Get a trainer by userId
   */
  getTrainerByUserId(userId: string): Promise<any> {
    try {
      return db
        .select({
          id: trainer.id,
          userId: trainer.userId,
          name: trainer.name,
          trainerPokemon: {
            id: trainerPokemon.id,
            trainerId: trainerPokemon.trainerId,
            pokemonId: trainerPokemon.pokemonId,
          },
          users: {
            id: users.id,
            username: users.username,
          },
        })
        .from(trainer)
        .leftJoin(trainerPokemon, eq(trainer.id, trainerPokemon.trainerId))
        .leftJoin(users, eq(trainer.userId, users.id))
        .where(eq(trainer.userId, userId))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le dresseur");
    }
  }

  /**
   * Add a trainer
   */
  addTrainer(newTrainer: NewTrainer) {
    try {
      return db
        .insert(trainer)
        .values(newTrainer)
        .returning({ id: trainer.id })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible d'ajouter le dresseur");
    }
  }

  addPokemonToTrainer(trainerId: string, pokemonId: string) {
    try {
      return db
        .insert(trainerPokemon)
        .values({
          trainerId,
          pokemonId,
        })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible d'ajouter le pokemon au dresseur");
    }
  }

  /**
   * Update a trainer
   */
  updateTrainer(trainerToUpdate: Trainer) {
    try {
      return db
        .update(trainer)
        .set(trainerToUpdate)
        .where(eq(trainer.id, trainerToUpdate.id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de mettre à jour le dresseur");
    }
  }

  /**
   * Delete a trainer
   */
  deleteTrainer(id: string) {
    try {
      return db.delete(trainer).where(eq(trainer.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le dresseur");
    }
  }

  deletePokemonFromTrainer(trainerId: string, pokemonId: string) {
    try {
      return db
        .delete(trainerPokemon)
        .where(
          and(
            eq(trainerPokemon.trainerId, trainerId),
            eq(trainerPokemon.pokemonId, pokemonId)
          )
        )
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le pokemon du dresseur");
    }
  }
}
