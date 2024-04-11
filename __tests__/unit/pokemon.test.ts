//@ts-nocheck
import { PokemonService } from "../../src/domain/services/PokemonService";
import { PokemonRepository } from "../../src/infrastructure/repositories/PokemonRepository";
import "jest";

describe("Pokemon", () => {
  const pokemonService = new PokemonService();
  const pokemonRepository = new PokemonRepository();
  const pokemon = {
    id: 1,
    name: {
      english: "Bulbasaur",
      japanese: "フシギダネ",
      chinese: "妙蛙种子",
      french: "Bulbizarre",
    },
    type: ["Grass", "Poison"],
    base: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      Speed: 45,
    },
    species: "Seed Pokémon",
    description:
      "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.",
    evolution: { next: [["2", "Level 16"]] },
    profile: {
      height: "0.7 m",
      weight: "6.9 kg",
      egg: ["Monster", "Grass"],
      ability: [
        ["Overgrow", "false"],
        ["Chlorophyll", "true"],
      ],
      gender: "87.5:12.5",
    },
    image: {
      sprite:
        "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/sprites/001.png",
      thumbnail:
        "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/001.png",
      hires:
        "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/001.png",
    },
  };

  it("should return a list of pokemons", async () => {
    const pokemons = pokemonService.getAllPokemons();
    expect(pokemons).toBeDefined();
  });

  it("should return a pokemon by id", () => {
    const pokemonAssert = pokemonService.getPokemonById(1);
    expect(pokemonAssert).toBeDefined();
    expect(pokemonAssert).toEqual(pokemon);
  });

  it("should return a random set of pokemons", () => {
    const set = 3;
    const pokemons = pokemonService.getRandomPokemons(set);
    expect(pokemons).toBeDefined();
    expect(pokemons.length).toBe(set);
  });

  it("should load pokemons.json", () => {
    expect(pokemonRepository).toBeDefined();
  });

  it("should return a list of pokemons", async () => {
    const allPokemons = pokemonRepository.getAllPokemons();
    expect(allPokemons).toBeDefined();
  });

  it("should return a pokemon by id", () => {
    const pokemonAssert = pokemonRepository.getPokemonById(1);
    expect(pokemonAssert).toBeDefined();
    expect(pokemonAssert).toEqual(pokemon);
  });
});
