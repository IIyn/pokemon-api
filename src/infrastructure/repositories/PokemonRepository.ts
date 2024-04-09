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

  loadPokemons(): Pokemon[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  getPokemonById(id: number): Pokemon | undefined {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  }

  getAllPokemons(): Pokemon[] {
    return this.pokemons;
  }
}
