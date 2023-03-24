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
    imageUrl: 'images/character-1.png',
    extraMargin: '0 0 0.5rem 0',
    maxWidth: '9rem',
  },
  {
    id: 2,
    imageUrl: 'images/character-2.png',
    extraMargin: '0 0 2rem 0',
    maxWidth: '12rem',
  },
  {
    id: 3,
    imageUrl: 'images/character-3.png',
    extraMargin: '0 0 1.5rem 0',
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
