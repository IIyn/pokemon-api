import { Pokemon } from "@src/domain/entities/Pokemon";
import { PokemonRepository } from "@src/infrastructure/repositories/PokemonRepository";

export class PokemonService {
  private pokemonRepository: PokemonRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  getPokemonById(id: number): Pokemon | undefined {
    return this.pokemonRepository.getPokemonById(id);
  }

  getAllPokemons(): Pokemon[] {
    return this.pokemonRepository.getAllPokemons();
  }

  getRandomPokemons(set: number): Pokemon[] {
    return this.pokemonRepository
      .getAllPokemons()
      .sort(() => Math.random() - Math.random())
      .slice(0, set);
  }
}
