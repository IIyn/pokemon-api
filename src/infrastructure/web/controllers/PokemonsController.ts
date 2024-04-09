import { Request, Response } from "express";
import { response } from "@/utils/response";
import { PokemonService } from "@/domain/services/PokemonService";

const pokemonService = new PokemonService();

export const getAllPokemons = (req: Request, res: Response) => {
  const pokemons = pokemonService.getAllPokemons();
  response(res, {
    statusCode: 200,
    message: "OK",
    data: pokemons,
  });
};

export const getPokemonById = (req: Request, res: Response) => {
  const { id } = req.params;
  const pokemon = pokemonService.getPokemonById(Number(id));
  response(res, {
    statusCode: 200,
    message: "OK",
    data: pokemon,
  });
};

export const getRandomPokemons = (req: Request, res: Response) => {
  const { set } = req.params;
  const randomPokemons = pokemonService.getRandomPokemons(Number(set));
  response(res, {
    statusCode: 200,
    message: "OK",
    data: randomPokemons,
  });
};
