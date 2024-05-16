import { Request, Response } from "express";
import { response } from "@/utils/response";
import { TrainerService } from "@/domain/services/TrainerService";
import { JwtPayload } from "@/types/jwt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const trainerService = new TrainerService();

/**
 *  Get a trainer by its id
 * @param req
 * @param res
 */
export const getTrainerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trainer = await trainerService.getTrainerById(id);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: trainer,
  });
};

/**
 * Get a trainer by user id
 * @param req
 * @param res
 */
export const getTrainerByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trainer = await trainerService.getTrainerByUserId(id);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: trainer,
  });
};

/**
 * Get the trainers of the user
 * @param req
 * @param res
 */
export const getSelfTrainers = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;
  console.log(accessToken);
  const decoded = jwt.decode(accessToken) as JwtPayload;
  console.log(decoded);
  const userId = decoded.userId;
  console.log(userId);
  const trainers = await trainerService.getTrainerByUserId(userId);
  console.log(trainers);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: trainers,
  });
};

/**
 *  Add a trainer
 * @param req
 * @param res
 */
export const addTrainer = (req: Request, res: Response) => {
  const { name, pokemonIds } = req.body;
  const { accessToken } = req.cookies;
  const decoded = jwt.decode(accessToken) as JwtPayload;
  const userId = decoded.userId;
  trainerService.addTrainer({ name, userId });
  response(res, {
    statusCode: 201,
    message: "Created",
  });
};

/**
 *  Add a pokemon to a trainer
 * @param req
 * @param res
 */
export const addPokemonToTrainer = (req: Request, res: Response) => {
  const { trainerId, pokemonId } = req.body;
  trainerService.addPokemonToTrainer(trainerId, pokemonId);
  response(res, {
    statusCode: 201,
    message: "Created",
  });
};

/**
 * Remove a pokemon from a trainer
 * @param req
 * @param res
 */
export const removePokemonFromTrainer = (req: Request, res: Response) => {
  const { trainerId, pokemonId } = req.body;
  trainerService.removePokemonFromTrainer(trainerId, pokemonId);
  response(res, {
    statusCode: 200,
    message: "OK",
  });
};

/**
 * Add a team to a trainer
 * @param req
 * @param res
 */
export const addTeamToTrainer = (req: Request, res: Response) => {
  const { trainerId, pokemonIds } = req.body;
  trainerService.addTeamToTrainer(trainerId, pokemonIds);
  response(res, {
    statusCode: 201,
    message: "Created",
  });
};
