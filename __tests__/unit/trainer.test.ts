//@ts-nocheck
import { NewTrainer } from "../../src/domain/entities/Trainer";
import { TrainerRepository } from "../../src/infrastructure/repositories/TrainerRepository";
import { TrainerService } from "../../src/domain/services/TrainerService";

import { createdUser } from "../jest.setup";

jest.mock("../../src/infrastructure/repositories/TrainerRepository");

describe("TrainerService", () => {
  let trainerServiceInstance: TrainerService;
  let trainer: NewTrainer = {
    name: "Ash Ketchum",
    age: 10,
  };

  beforeAll(() => {
    trainerServiceInstance = new TrainerService();
  });

  it("should add a new trainer", async () => {
    const createdTrainerID = await trainerServiceInstance.addTrainer({
      ...trainer,
      userId: createdUser.id,
    });

    expect(createdTrainerID).toBeTruthy();
  });

  it("should get a trainer by its id", async () => {
    const trainerByID = await trainerServiceInstance.getTrainerById(
      createdUser.id
    );

    expect(trainerByID).toBeTruthy();
  });

  it("should get a trainer by its user id", async () => {
    const trainerByUserID = await trainerServiceInstance.getTrainerByUserId(
      createdUser.id
    );

    expect(trainerByUserID).toBeTruthy();
  });

  it("should add a pokemon to a trainer", () => {
    trainerServiceInstance.addPokemonToTrainer("1", "1");

    expect(TrainerRepository.prototype.addPokemonToTrainer).toHaveBeenCalled();
  });

  it("should delete a trainer", () => {
    trainerServiceInstance.deleteTrainer(createdUser.id);

    // Check if the trainer was deleted
    const trainer = trainerServiceInstance.getTrainerByUserId(createdUser.id);

    expect(trainer).toBeFalsy();
  });
});
