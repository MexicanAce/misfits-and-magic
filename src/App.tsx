import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './App.scss';
import CharacterAttributes from './components/character-attributes/character-attributes';
import CharacterDescription from './components/character-description/character-description';
import CharacterInventory from './components/character-inventory/character-inventory';
import CharacterModel from './components/character-model/character-model';
import HamburgerMenu from './components/hamburger-menu/hamburger-menu';
import { Character, CharacterModels, DefaultCharacter } from './types/Character';
import { DiceType } from './types/Dice';

function App() {
  const LocalStorageCharacterKey = 'mnm-character-v1';
  const localStorageCharacter = localStorage.getItem(LocalStorageCharacterKey);

  const initCharacter: Character = localStorageCharacter ?
    JSON.parse(localStorageCharacter) as Character :
    DefaultCharacter;

  const [character, setCharacter] = useState<Character>(initCharacter);

  useEffect(() => {
    localStorage.setItem(LocalStorageCharacterKey, JSON.stringify(character));
  }, [character]);

  return (
    <div className="App">
      <div className="background-image"></div>
      <div className="background-filter"></div>

      <HamburgerMenu
        character={character}
        setCharacter={setCharacter}
      />

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
