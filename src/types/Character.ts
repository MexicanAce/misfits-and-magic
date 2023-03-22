import { DiceType } from './Dice';

export interface Character {
  displayName: string;
  owner: string;
  description: string;
  age: number;
  likes: string[];
  dislikes: string[];
  broom?: string;
  wand?: string;
  imageUrl: string;
  adversityTokens: number;
  house?: string;

  // Stats
  brains: CharacterStat;
  brawn: CharacterStat;
  fight: CharacterStat;
  flight: CharacterStat;
  grit: CharacterStat;
  charm: CharacterStat;
}

export interface CharacterStat {
  modifier?: number;
  diceType?: DiceType;
}
