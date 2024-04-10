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
}
