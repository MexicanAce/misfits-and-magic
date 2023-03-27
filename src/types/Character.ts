import { DiceType } from './Dice';
import { House } from './House';

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
  house?: House;
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

export const DefaultCharacter: Character = {
  displayName: 'Kristina Ollivander',
  owner: 'Nicolas Villanueva',
  description: 'Owlbear Whisperer',
  age: 15,
  likes: ['Owls', 'Northern Lights'],
  dislikes: ['Camping', 'Cold Weather'],
  model: CharacterModels.filter(cm => cm.id == 1)[0],
  broom: 'The Suave Sweeper',
  robeColorHue: 160,
  adversityTokens: 0,
  brains: {
    diceType: DiceType.D4,
  },
  brawn: {
    diceType: DiceType.D6,
    modifier: -1,
  },
  fight: {
    diceType: DiceType.D8,
    modifier: 3,
  },
  flight: {
    diceType: DiceType.D12,
  },
  grit: {
    diceType: DiceType.D10,
  },
  charm: {
    diceType: DiceType.D20,
    modifier: -1,
  },
}