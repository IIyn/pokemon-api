import { PokemonRepository } from "@/infrastructure/repositories/PokemonRepository";
import fs from "fs";
import path from "path";

/**
 * Pokemon service, used to interact with the pokemon repository
 * @class
 */
export class PokemonService {
  private pokemonRepository: PokemonRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  /**
   * Get a pokemon by its ID
   * @param id - The pokemon ID
   * @returns Pokemon | undefined - The pokemon with the given ID
   */
  getPokemonById(id: number): Promise<any | undefined> {
    return this.pokemonRepository.getPokemonById(id);
  }

  /**
   * Get all pokemons
   * @returns Pokemon[] - All pokemons
   */
  getAllPokemons(
    limit: number | undefined,
    offset: number | undefined
  ): Promise<any> {
    return this.pokemonRepository.getAllPokemons(limit, offset);
  }

  private fromJSON() {
    const filePath = path.join(
      __dirname,
      "..",
      "data",
      "json",
      "pokemons.json"
    );
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }

  private storeJSONinDB() {
    const pokemons = this.fromJSON();
    pokemons.forEach((pokemon: any) => {
      this.pokemonRepository.createPokemon({
        id: pokemon.id,
        species: pokemon.species,
        description: pokemon.description,
      });
    });
  }
}
