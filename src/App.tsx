import { useState } from 'react';
import './App.scss';
import CharacterAttributes from './components/character-attributes/character-attributes';
import CharacterDescription from './components/character-description/character-description';
import CharacterInventory from './components/character-inventory/character-inventory';
import CharacterModel from './components/character-model/character-model';
import { Character } from './types/Character';
import { DiceType } from './types/Dice';

function App() {
  const [character, setCharacter] = useState<Character>({
    displayName: 'Kristina Ollivander',
    owner: 'Iesha White',
    description: 'Owlbear Whisperer',
    age: 15,
    likes: ['Owls', 'Northern Lights'],
    dislikes: ['Camping', 'Cold Weather'],
    imageUrl: 'images/character-female.png',
    broom: 'The Suave Sweeper',
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
  });

  return (
    <div className="App">
      <div className="background-image"></div>
      <div className="background-filter"></div>
      <div className="main-content">
        <div className="character-sheet-left">
          <CharacterDescription
            character={character}
            setCharacter={setCharacter}
          />
          <CharacterInventory
            character={character}
            setCharacter={setCharacter}
          />
          <CharacterAttributes
            character={character}
            setCharacter={setCharacter}
          />
        </div>
        <div className="character-sheet-right">
          <CharacterModel character={character} setCharacter={setCharacter} />
        </div>
      </div>
    </div>
  );
}

export default App;
