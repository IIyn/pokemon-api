import { Trainer } from "@/domain/entities/Trainer";
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
  getTrainerById(id: string): Trainer | undefined {
    return this.trainerRepository.getTrainerById(id);
  }

  /**
   * Get a trainer by userId
   * @param userId - The id of the user
   */
  getTrainerByUserId(userId: string): (Trainer | undefined)[] {
    return this.trainerRepository.getTrainerByUserId(userId);
  }

  /**
   * Add a trainer
   * @param trainer - The trainer to add
   */
  addTrainer(trainer: Trainer): void {
    this.trainerRepository.addTrainer(trainer);
    this.trainerRepository.saveTrainers();
  }

  /**
   * Delete a trainer
   * @param id - The id of the trainer
   */
  deleteTrainer(id: string): void {
    this.trainerRepository.deleteTrainer(id);
    this.trainerRepository.saveTrainers();
  }

  /**
   * Add a pokemon to a trainer
   * @param trainerId - The id of the trainer
   * @param pokemonId - The id of the pokemon
   */
  addPokemonToTrainer(trainerId: string, pokemonId: string): void {
    const trainer = this.getTrainerById(trainerId);
    if (trainer) {
      trainer.pokemonIds.push(pokemonId);
      this.trainerRepository.updateTrainer(trainer);
      this.trainerRepository.saveTrainers();
    }
  }

  /**
   * Remove a pokemon from a trainer
   * @param trainerId - The id of the trainer
   * @param pokemonId - The id of the pokemon
   */
  removePokemonFromTrainer(trainerId: string, pokemonId: string): void {
    const trainer = this.getTrainerById(trainerId);
    if (trainer) {
      trainer.pokemonIds = trainer.pokemonIds.filter((id) => id !== pokemonId);
      this.trainerRepository.updateTrainer(trainer);
    }
    this.trainerRepository.saveTrainers();
  }

  /**
   * Add a team of pokemons to a trainer
   * @param trainerId - The id of the trainer
   * @param pokemonIds - The ids of the pokemons
   */
  addTeamToTrainer(trainerId: string, pokemonIds: string[]): void {
    const trainer = this.getTrainerById(trainerId);
    if (trainer) {
      trainer.pokemonIds.push(...pokemonIds);
      this.trainerRepository.updateTrainer(trainer);
    }
    this.trainerRepository.saveTrainers();
  }
}
