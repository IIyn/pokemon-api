import { NewTrainer } from "@/domain/entities/Trainer";
import { TrainerRepository } from "@/infrastructure/repositories/TrainerRepository";

/**
 * Trainer service
 * @class
 * @public
 */
export class TrainerService {
  private trainerRepository: TrainerRepository;

  constructor() {
    this.trainerRepository = new TrainerRepository();
  }

  /**
   * Get a trainer by id
   * @param id - The id of the trainer
   */
  getTrainerById(id: string): Promise<any> {
    return this.trainerRepository.getTrainerById(id);
  }

  /**
   * Get a trainer by userId
   * @param userId - The id of the user
   */
  getTrainerByUserId(userId: string): Promise<any> {
    return this.trainerRepository.getTrainerByUserId(userId);
  }

  /**
   * Add a trainer
   * @param trainer - The trainer to add
   */
  addTrainer(trainer: NewTrainer) {
    return this.trainerRepository.addTrainer(trainer);
  }

  /**
   * Delete a trainer
   * @param id - The id of the trainer
   */
  deleteTrainer(id: string): void {
    this.trainerRepository.deleteTrainer(id);
  }

  /**
   * Add a pokemon to a trainer
   * @param trainerId - The id of the trainer
   * @param pokemonId - The id of the pokemon
   */
  addPokemonToTrainer(trainerId: string, pokemonId: string): void {
    this.trainerRepository.addPokemonToTrainer(trainerId, pokemonId);
  }

  /**
   * Remove a pokemon from a trainer
   * @param trainerId - The id of the trainer
   * @param pokemonId - The id of the pokemon
   */
  removePokemonFromTrainer(trainerId: string, pokemonId: string): void {
    this.trainerRepository.deletePokemonFromTrainer(trainerId, pokemonId);
  }

  /**
   * Add a team of pokemons to a trainer
   * @param trainerId - The id of the trainer
   * @param pokemonIds - The ids of the pokemons
   */
  addTeamToTrainer(trainerId: string, pokemonIds: string[]): void {
    for (const pokemonId of pokemonIds) {
      this.trainerRepository.addPokemonToTrainer(trainerId, pokemonId);
    }
  }
}
