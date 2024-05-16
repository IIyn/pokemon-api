import {
  Pokemon,
  NewPokemon,
  NewPokemonStats,
  TypeEnum,
  NewPokemonEvolutions,
  NewPokemonProfile,
  NewPokemonImages,
  NewType,
} from "@/domain/entities/Pokemon";
import { db } from "@/infrastructure/data";
import { eq } from "drizzle-orm";
import {
  pokemon,
  pokemonEvolutions,
  pokemonImages,
  pokemonProfile,
  pokemonStats,
  pokemonTypes,
  type,
  multilingualNames,
} from "@/infrastructure/data/schema";
import {
  MultilingualNames,
  NewMultilingualNames,
} from "@/domain/entities/MultilingualNames";
import { MultilingualNamesRepository } from "./MultilingualNamesRepository";

/**
 * Handling pokemons
 * @class
 * @public
 */
export class PokemonRepository {
  private multilingualNamesRepository: MultilingualNamesRepository;

  constructor() {
    this.multilingualNamesRepository = new MultilingualNamesRepository();
  }

  /**
   * Get a pokemon by its id
   * @param id - The id of the pokemon
   * @returns Pokemon | undefined - The pokemon with the given id
   */
  getPokemonById(id: number) {
    try {
      return db
        .select({
          uuid: pokemon.uuid,
          id: pokemon.id,
          species: pokemon.species,
          description: pokemon.description,
          pokemonProfile: {
            id: pokemonProfile.id,
            pokemonId: pokemonProfile.pokemonId,
            height: pokemonProfile.height,
            weight: pokemonProfile.weight,
            gender: pokemonProfile.gender,
          },
          pokemonStats: {
            id: pokemonStats.id,
            hp: pokemonStats.hp,
            attack: pokemonStats.attack,
            defense: pokemonStats.defense,
            specialAttack: pokemonStats.specialAttack,
            specialDefense: pokemonStats.specialDefense,
            pokemonId: pokemonStats.pokemonId,
          },
          pokemonImages: {
            id: pokemonImages.id,
            pokemonId: pokemonImages.pokemonId,
            sprite: pokemonImages.sprite,
            thumbnail: pokemonImages.thumbnail,
            hires: pokemonImages.hires,
          },
          pokemonEvolutions: {
            id: pokemonEvolutions.id,
            previous: pokemonEvolutions.previous,
            next: pokemonEvolutions.next,
            prevLevel: pokemonEvolutions.prevLevel,
            nextLevel: pokemonEvolutions.nextLevel,
          },
          pokemonTypes: {
            pokemonId: pokemonTypes.pokemonId,
            typeId: pokemonTypes.typeId,
          },
        })
        .from(pokemon)
        .leftJoin(pokemonProfile, eq(pokemon.uuid, pokemonProfile.pokemonId))
        .leftJoin(pokemonStats, eq(pokemon.uuid, pokemonStats.pokemonId))
        .leftJoin(pokemonImages, eq(pokemon.uuid, pokemonImages.pokemonId))
        .leftJoin(
          pokemonEvolutions,
          eq(pokemon.uuid, pokemonEvolutions.pokemonId)
        )
        .leftJoin(pokemonTypes, eq(pokemon.uuid, pokemonTypes.pokemonId))
        .where(eq(pokemon.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le pokémon");
    }
  }

  /**
   * Get all pokemons
   * @returns {Pokemon[]} - All pokemons
   */
  getAllPokemons(limit: number = 30, offset: number = 0) {
    try {
      return db
        .select({
          uuid: pokemon.uuid,
          id: pokemon.id,
          species: pokemon.species,
          description: pokemon.description,
          profile: {
            id: pokemonProfile.id,
            pokemonId: pokemonProfile.pokemonId,
            height: pokemonProfile.height,
            weight: pokemonProfile.weight,
            gender: pokemonProfile.gender,
          },
          pokemonStats: {
            id: pokemonStats.id,
            hp: pokemonStats.hp,
            attack: pokemonStats.attack,
            defense: pokemonStats.defense,
            specialAttack: pokemonStats.specialAttack,
            specialDefense: pokemonStats.specialDefense,
            pokemonId: pokemonStats.pokemonId,
          },
          pokemonImages: {
            id: pokemonImages.id,
            pokemonId: pokemonImages.pokemonId,
            sprite: pokemonImages.sprite,
            thumbnail: pokemonImages.thumbnail,
            hires: pokemonImages.hires,
          },
          pokemonEvolutions: {
            id: pokemonEvolutions.id,
            previous: pokemonEvolutions.previous,
            next: pokemonEvolutions.next,
            prevLevel: pokemonEvolutions.prevLevel,
            nextLevel: pokemonEvolutions.nextLevel,
          },
          pokemonTypes: {
            pokemonId: pokemonTypes.pokemonId,
            typeId: pokemonTypes.typeId,
          },
        })
        .from(pokemon)
        .leftJoin(pokemonProfile, eq(pokemon.uuid, pokemonProfile.pokemonId))
        .leftJoin(pokemonStats, eq(pokemon.uuid, pokemonStats.pokemonId))
        .leftJoin(pokemonImages, eq(pokemon.uuid, pokemonImages.pokemonId))
        .leftJoin(
          pokemonEvolutions,
          eq(pokemon.uuid, pokemonEvolutions.pokemonId)
        )
        .leftJoin(pokemonTypes, eq(pokemon.uuid, pokemonTypes.pokemonId))
        .limit(limit)
        .offset(offset)
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le pokémon");
    }
  }

  /**
   * Create a new pokemon
   * @param newPokemon - The new pokemon to create
   * @returns {Promise<uuid>} - The created pokemon uuid
   */
  createPokemon(newPokemon: NewPokemon) {
    try {
      return db
        .insert(pokemon)
        .values(newPokemon)
        .returning({
          uuid: pokemon.uuid,
        })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le pokémon");
    }
  }

  createPokemonNames(pokemonId: string, names: NewMultilingualNames[]) {
    for (const name of names) {
      this.multilingualNamesRepository.createMultilingualName({
        ...name,
        pokemonId: pokemonId,
      });
    }
  }

  async getType(typeToGet: TypeEnum) {
    try {
      return db
        .select({
          id: type.id,
          type: type.type,
        })
        .from(type)
        .where(eq(type.type, typeToGet))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le type");
    }
  }

  async createType(typeToInsert: NewType) {
    try {
      return db
        .insert(type)
        .values(typeToInsert)
        .returning({
          id: type.id,
        })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le type");
    }
  }

  async createPokemonTypes(pokemonId: string, types: string[]) {
    for (const typeToInsert of types) {
      const enumedType = TypeEnum[typeToInsert as keyof typeof TypeEnum];

      let typeExists = await this.getType(enumedType);
      db.insert(pokemonTypes)
        .values({
          pokemonId: pokemonId,
          typeId: typeExists[0].id,
        })
        .execute();
    }
  }

  createPokemonStats(stats: NewPokemonStats) {
    try {
      return db
        .insert(pokemonStats)
        .values({
          ...stats,
          pokemonId: stats.pokemonId,
        })
        .returning({
          id: pokemonStats.id,
        })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer les statistiques du pokémon");
    }
  }

  createPokemonEvolutions(evolutions: NewPokemonEvolutions) {
    try {
      return db
        .insert(pokemonEvolutions)
        .values({
          ...evolutions,
          pokemonId: evolutions.pokemonId,
        })
        .returning({
          id: pokemonEvolutions.id,
        })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer les évolutions du pokémon");
    }
  }

  createPokemonProfile(profile: NewPokemonProfile) {
    try {
      return db
        .insert(pokemonProfile)
        .values({
          ...profile,
          pokemonId: profile.pokemonId,
        })
        .returning({
          id: pokemonProfile.id,
        })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le profil du pokémon");
    }
  }

  createPokemonImages(images: NewPokemonImages) {
    try {
      return db
        .insert(pokemonImages)
        .values({
          ...images,
          pokemonId: images.pokemonId,
        })
        .returning({
          id: pokemonImages.id,
        })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer les images du pokémon");
    }
  }
}
