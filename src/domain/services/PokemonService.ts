import { Pokemon } from "@/domain/entities/Pokemon";
import { PokemonRepository } from "@/infrastructure/repositories/PokemonRepository";

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
  getPokemonById(id: number): Pokemon | undefined {
    return this.pokemonRepository.getPokemonById(id);
  }

  /**
   * Get all pokemons
   * @returns Pokemon[] - All pokemons
   */
  getAllPokemons(): Pokemon[] {
    return this.pokemonRepository.getAllPokemons();
  }

  /**
   *
   * @param set - The number of random pokemons to retrieve
   * @returns Pokemon[] - A set of random pokemons
   */
  getRandomPokemons(set: number): Pokemon[] {
    return this.pokemonRepository
      .getAllPokemons()
      .sort(() => Math.random() - Math.random())
      .slice(0, set);
  }
}
