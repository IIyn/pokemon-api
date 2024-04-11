import { Pokemon } from "@/domain/entities/Pokemon";
import fs from "fs";
import path from "path";

/**
 * Handling pokemons
 * @class
 * @public
 */
export class PokemonRepository {
  private pokemons: Pokemon[] = [];

  private readonly filePath = path.join(
    __dirname,
    "..",
    "data",
    "pokemons.json"
  ); // readonly we only need to set it once

  constructor() {
    this.pokemons = this.loadPokemons();
  }

  /**
   * Load pokemons from the json file
   * @returns {Pokemon[]} - The list of pokemons
   */
  loadPokemons(): Pokemon[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  /**
   * Get a pokemon by its id
   * @param id - The id of the pokemon
   * @returns Pokemon | undefined - The pokemon with the given id
   */
  getPokemonById(id: number): Pokemon | undefined {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  }

  /**
   * Get all pokemons
   * @returns {Pokemon[]} - All pokemons
   */
  getAllPokemons(limit: number = 30): Pokemon[] {
    return this.pokemons.slice(0, limit);
  }
}
