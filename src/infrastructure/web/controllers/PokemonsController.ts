import { Request, Response } from "express";
import { response } from "@/utils/response";
import { PokemonService } from "@/domain/services/PokemonService";

const pokemonService = new PokemonService();

/**
 * Get all pokemons
 * @param req - The request
 * @param res - The response
 */
export const getAllPokemons = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const pokemons = await pokemonService.getAllPokemons(
    Number(limit),
    Number(offset)
  );
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
export const getPokemonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pokemon = await pokemonService.getPokemonById(Number(id));
  response(res, {
    statusCode: 200,
    message: "OK",
    data: pokemon,
  });
};

