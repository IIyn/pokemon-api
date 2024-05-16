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

export type PokemonStats = InferSelectModel<typeof pokemonStats>;

export type PokemonImages = InferSelectModel<typeof pokemonImages>;


