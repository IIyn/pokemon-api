import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pokemon,
  pokemonEvolutions,
  pokemonImages,
  pokemonProfile,
  pokemonStats,
  pokemonTypes,
  type,
} from "@/infrastructure/data/schema";

export type Pokemon = InferSelectModel<typeof pokemon>;

export type NewPokemon = InferInsertModel<typeof pokemon>;

export type PokemonColumns = { [K in keyof Pokemon]?: boolean };

export type PokemonProfile = InferSelectModel<typeof pokemonProfile>;

export type NewPokemonProfile = InferInsertModel<typeof pokemonProfile>;

export type PokemonStats = InferSelectModel<typeof pokemonStats>;

export type NewPokemonStats = InferInsertModel<typeof pokemonStats>;

export type PokemonImages = InferSelectModel<typeof pokemonImages>;

export type NewPokemonImages = InferInsertModel<typeof pokemonImages>;

export type PokemonEvolutions = InferSelectModel<typeof pokemonEvolutions>;

export type NewPokemonEvolutions = InferInsertModel<typeof pokemonEvolutions>;

export type PokemonTypes = InferSelectModel<typeof pokemonTypes>;

export type NewPokemonTypes = InferInsertModel<typeof pokemonTypes>;

export type Type = InferSelectModel<typeof type>;

export type NewType = InferInsertModel<typeof type>;

export enum TypeEnum {
  Grass = "Grass",
  Poison = "Poison",
  Fire = "Fire",
  Flying = "Flying",
  Water = "Water",
  Bug = "Bug",
  Normal = "Normal",
  Electric = "Electric",
  Ground = "Ground",
  Fairy = "Fairy",
  Fighting = "Fighting",
  Psychic = "Psychic",
  Rock = "Rock",
  Steel = "Steel",
  Ice = "Ice",
  Ghost = "Ghost",
  Dragon = "Dragon",
  Dark = "Dark",
}
