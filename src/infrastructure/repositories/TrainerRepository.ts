import { Trainer } from "@/domain/entities/Trainer";
import path from "path";
import fs from "fs";

/**
 * Trainer repository
 * @class
 * @public
 */
export class TrainerRepository {
  private trainers: Trainer[] = [];

  private readonly filePath = path.join(
    __dirname,
    "..",
    "data",
    "trainers.json"
  ); // readonly we only need to set it once

  constructor() {
    this.trainers = this.loadTrainers();
  }

  /**
   * Load trainers from the json file
   */
  loadTrainers(): Trainer[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  /**
   * Save trainers to the json file
   */
  saveTrainers(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.trainers, null, 2));
  }

  /**
   * Get a trainer by id
   */
  getTrainerById(id: string): Trainer | undefined {
    return this.trainers.find((trainer) => trainer.id === id);
  }

  /**
   * Get a trainer by userId
   */
  getTrainerByUserId(userId: string): (Trainer | undefined)[] {
    return this.trainers.map((trainer) => {
      if (trainer.userId === userId) {
        return trainer;
      }
    });
  }

  /**
   * Add a trainer
   */
  addTrainer(trainer: Trainer): void {
    this.trainers.push(trainer);
  }

  /**
   * Update a trainer
   */
  updateTrainer(trainer: Trainer): void {
    this.trainers = this.trainers.map((t) =>
      t.id === trainer.id ? trainer : t
    );
  }

  /**
   * Delete a trainer
   */
  deleteTrainer(id: string): void {
    this.trainers = this.trainers.filter((trainer) => trainer.id !== id);
  }
}
