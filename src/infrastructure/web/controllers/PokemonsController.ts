import { Request, Response } from "express";
import { response } from "@/utils/response";
import { PokemonService } from "@/domain/services/PokemonService";

const pokemonService = new PokemonService();

/**
 * Get all pokemons
 * @param req - The request
 * @param res - The response
 */
export const getAllPokemons = (req: Request, res: Response) => {
  const { limit } = req.query;
  const pokemons = pokemonService.getAllPokemons(Number(limit));
  response(res, {
    statusCode: 200,
    message: "OK",
    data: pokemons,
  });
};

/**
 * Get a pokemon by its id
 * @param req - The request
 * @param res - The response
 */
export const getPokemonById = (req: Request, res: Response) => {
  const { id } = req.params;
  const pokemon = pokemonService.getPokemonById(Number(id));
  response(res, {
    statusCode: 200,
    message: "OK",
    data: pokemon,
  });
};

/**
 * Get a random set of pokemons
 * @param req
 * @param res
 */
export const getRandomPokemons = (req: Request, res: Response) => {
  const { set } = req.params;
  const randomPokemons = pokemonService.getRandomPokemons(Number(set));
  response(res, {
    statusCode: 200,
    message: "OK",
    data: randomPokemons,
  });
};
