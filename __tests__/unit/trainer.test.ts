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
      pokemonIds: ["67"],
    };
  });

  it("should get a trainer by id", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(trainer);

    const result = trainerService.getTrainerById("1");

    expect(result).toBe(trainer);
    expect(mockTrainerRepository.getTrainerById).toHaveBeenCalledWith("1");
  });

  it("should get a trainer by userId", () => {
    mockTrainerRepository.getTrainerByUserId.mockReturnValue([trainer]);

    const result = trainerService.getTrainerByUserId("1");

    expect(result).toEqual([trainer]);
    expect(mockTrainerRepository.getTrainerByUserId).toHaveBeenCalledWith("1");
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

    trainerService.deleteTrainer("1");

    expect(mockTrainerRepository.deleteTrainer).toHaveBeenCalledWith("1");
    expect(mockTrainerRepository.saveTrainers).toHaveBeenCalled();
  });

  it("should add a pokemon to a trainer", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(trainer);

    trainerService.addPokemonToTrainer("1", "2");

    expect(mockTrainerRepository.updateTrainer).toHaveBeenCalledWith(trainer);
    expect(mockTrainerRepository.saveTrainers).toHaveBeenCalled();
  });

  it("should remove a pokemon from a trainer", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(trainer);

    trainerService.removePokemonFromTrainer("1", "2");

    expect(mockTrainerRepository.updateTrainer).toHaveBeenCalledWith(trainer);
    expect(mockTrainerRepository.saveTrainers).toHaveBeenCalled();
  });

  it("should add a team of pokemons to a trainer", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(trainer);

    trainerService.addTeamToTrainer("1", ["2", "3"]);

    expect(mockTrainerRepository.updateTrainer).toHaveBeenCalledWith(trainer);
    expect(mockTrainerRepository.saveTrainers).toHaveBeenCalled();
  });

  it("should not add a team of pokemons to a trainer if the trainer does not exist", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(undefined);

    trainerService.addTeamToTrainer("1", ["2", "3"]);

    expect(mockTrainerRepository.updateTrainer).not.toHaveBeenCalled();
  });

  it("should not remove a pokemon from a trainer if the trainer does not exist", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(undefined);

    trainerService.removePokemonFromTrainer("1", "2");

    expect(mockTrainerRepository.updateTrainer).not.toHaveBeenCalled();
  });

  it("should not add a pokemon to a trainer if the trainer does not exist", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(undefined);

    trainerService.addPokemonToTrainer("1", "2");

    expect(mockTrainerRepository.updateTrainer).not.toHaveBeenCalled();
  });

  it("should not delete a trainer if the trainer does not exist", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(undefined);

    trainerService.deleteTrainer("1");

    expect(mockTrainerRepository.deleteTrainer).not.toHaveBeenCalled();
  });

  it("should not get a trainer by id if the trainer does not exist", () => {
    mockTrainerRepository.getTrainerById.mockReturnValue(undefined);

    const result = trainerService.getTrainerById("1");

    expect(result).toBeUndefined();
    expect(mockTrainerRepository.getTrainerById).toHaveBeenCalledWith("1");
  });

  it("should not get a trainer by userId if the trainer does not exist", () => {
    mockTrainerRepository.getTrainerByUserId.mockReturnValue([]);

    const result = trainerService.getTrainerByUserId("1");

    expect(result).toEqual([]);
    expect(mockTrainerRepository.getTrainerByUserId).toHaveBeenCalledWith("1");
  });
});
