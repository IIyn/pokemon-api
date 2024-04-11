//@ts-nocheck
import { Trainer } from "../../src/domain/entities/Trainer";
import { TrainerRepository } from "../../src/infrastructure/repositories/TrainerRepository";
import { TrainerService } from "../../src/domain/services/TrainerService";

jest.mock("../../src//infrastructure/repositories/TrainerRepository");

describe("TrainerService", () => {
  let trainerService: TrainerService;
  let mockTrainerRepository: jest.Mocked<TrainerRepository>;
  let trainer: Trainer;

  beforeEach(() => {
    mockTrainerRepository =
      new TrainerRepository() as jest.Mocked<TrainerRepository>;
    trainerService = new TrainerService();
    (trainerService as any).trainerRepository = mockTrainerRepository;
    trainer = {
      id: "1",
      name: "Trainer000",
      userId: "1",
      pokemons: ["67"],
    };
  });

  it("should get a trainer by id", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(trainer);

    const result = trainerService.getTrainerById("1");

    expect(result).toBe(trainer);
    expect(mockTrainerRepository.getTrainerById).toHaveBeenCalledWith("1");
  });

  it("should add a trainer", () => {
    const trainer: Trainer = {
      id: "2",
      name: "Trainer000",
      userId: "2",
      pokemons: ["2"],
    };

    trainerService.addTrainer(trainer);

    expect(mockTrainerRepository.addTrainer).toHaveBeenCalledWith(trainer);
    expect(mockTrainerRepository.saveTrainers).toHaveBeenCalled();
  });

  it("should delete a trainer", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(trainer);

    trainerService.deleteTrainer("2");

    expect(mockTrainerRepository.deleteTrainer).toHaveBeenCalledWith("2");
    expect(mockTrainerRepository.saveTrainers).toHaveBeenCalled();
  });
});
