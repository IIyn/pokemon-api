import { PokemonRepository } from "@/infrastructure/repositories/PokemonRepository";
import fs from "fs";
import path from "path";
import {
  LanguagesEnum,
  NewMultilingualNames,
} from "../entities/MultilingualNames";
import { ItemRepository } from "@/infrastructure/repositories/ItemRepository";

/**
 * Pokemon service, used to interact with the pokemon repository
 * @class
 */
export class PokemonService {
  private pokemonRepository: PokemonRepository;
  private itemRepository: ItemRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
    this.itemRepository = new ItemRepository();

    // set up pokemon in your db, uncomment this code to store the pokemons in your db

    // const pokemonDB = this.pokemonRepository.getAllPokemons(1, 0);

    // pokemonDB.then(async (pokemon) => {
    //   if (pokemon.length === 0) {
    //     this.storeJSONinDB();
    //   } else {
    //     await this.storeJSONinDB();
    //   }
    // });

    // const itemDB = this.itemRepository.getAllItems(1, 0);
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
      "..",
      "infrastructure",
      "data",
      "json",
      "pokemons.json"
    );
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }

  private async storeJSONinDB() {
    const types = [
      "Grass",
      "Poison",
      "Fire",
      "Flying",
      "Water",
      "Bug",
      "Normal",
      "Electric",
      "Ground",
      "Fairy",
      "Fighting",
      "Psychic",
      "Rock",
      "Steel",
      "Ice",
      "Ghost",
      "Dragon",
      "Dark",
    ];

    types.forEach(async (typeToInsert) => {
      await this.pokemonRepository.createType({
        type: typeToInsert,
      });
    });

    const pokemons = this.fromJSON();
    pokemons.forEach(async (pokemon: any) => {
      const pokemonId = await this.pokemonRepository.createPokemon({
        id: pokemon.id,
        species: pokemon.species,
        description: pokemon.description,
      });

      const names = pokemon.name;
      const enumedNames: NewMultilingualNames[] = [
        {
          name: names.english || "",
          language: LanguagesEnum.English,
          pokemonId: pokemonId[0].uuid,
        },
        {
          name: names.japanese || "",
          language: LanguagesEnum.Japanese,
          pokemonId: pokemonId[0].uuid,
        },
        {
          name: names.chinese || "",
          language: LanguagesEnum.Chinese,
          pokemonId: pokemonId[0].uuid,
        },
        {
          name: names.french || "",
          language: LanguagesEnum.French,
          pokemonId: pokemonId[0].uuid,
        },
      ];
      this.pokemonRepository.createPokemonNames(pokemonId[0].uuid, enumedNames);

      const types = pokemon.type;
      this.pokemonRepository.createPokemonTypes(pokemonId[0].uuid, types);

      const stats = pokemon.base;
      if (stats) {
        this.pokemonRepository.createPokemonStats({
          hp: stats?.HP,
          attack: stats?.Attack,
          defense: stats?.Defense,
          specialAttack: stats["Sp. Attack"],
          specialDefense: stats["Sp. Defense"],
          pokemonId: pokemonId[0].uuid,
        });
      }

      const evolution = pokemon.evolution;
      this.pokemonRepository.createPokemonEvolutions({
        pokemonId: pokemonId[0].uuid,
        previous:
          evolution.prev === undefined ? null : Number(evolution.prev[0]),
        next:
          evolution.next === undefined ? null : Number(evolution.next[0][0]),
        prevLevel: evolution.prev !== undefined ? evolution.prev[1] : null,
        nextLevel: evolution.next !== undefined ? evolution.next[0][1] : null,
      });

      const profile = pokemon.profile;
      this.pokemonRepository.createPokemonProfile({
        pokemonId: pokemonId[0].uuid,
        height: profile.height,
        weight: profile.weight,
        gender: profile.gender,
      });

      const images = pokemon.image;
      this.pokemonRepository.createPokemonImages({
        pokemonId: pokemonId[0].uuid,
        sprite: images.sprite || "",
        thumbnail: images.thumbnail || "",
        hires: images.hires || "",
      });
    });
  }
}
