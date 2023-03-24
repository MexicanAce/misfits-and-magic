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
  adversityTokens: number;
  house?: string;
  robeColorHue: number;
  model: CharacterModel;

  // Stats
  brains: CharacterStat;
  brawn: CharacterStat;
  fight: CharacterStat;
  flight: CharacterStat;
  grit: CharacterStat;
  charm: CharacterStat;
}

export const CharacterModels: CharacterModel[] = [
  {
    id: 1,
    imageUrl: 'images/character-female.png',
    extraMargin: '0 0 0 0',
    maxWidth: '10rem',
  },
  {
    id: 2,
    imageUrl: 'images/character-male.png',
    extraMargin: '0 0 2rem 0',
    maxWidth: '12rem',
  },
]

export interface CharacterModel {
  id: number;
  imageUrl: string;
  extraMargin: string;
  maxWidth: string;
}

export interface CharacterStat {
  modifier?: number;
  diceType?: DiceType;
}
