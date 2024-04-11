/**
 * Interface representing a Pokemon entity based on the data from the Pokemons.json file.
 */
export interface Pokemon {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    SpAttack: number;
    SpDefense: number;
    Speed: number;
  };
  species: string;
  description: string;
  evolution: {
    next?: string;
    prev?: string;
  };
  profile: {
    height: string;
    weight: string;
    egg: string[];
    ability: Array<string[]>;
    gender: string;
  };
  image: {
    sprite: string;
    thumbnail: string;
    hires: string;
  };
}
