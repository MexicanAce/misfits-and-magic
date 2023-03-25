import { Dispatch, SetStateAction } from 'react';
import { BroomPrefixes, BroomSuffixes } from '../../types/Brooms';
import { Character } from '../../types/Character';
import UnknownValue from '../unknown-value/unknown-value';
import './character-inventory.scss';

function CharacterInventory({
  character,
  setCharacter,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  function refreshBroom() {
    const prefix =
      BroomPrefixes[Math.floor(Math.random() * BroomPrefixes.length)];
    const suffix =
      BroomSuffixes[Math.floor(Math.random() * BroomSuffixes.length)];

    setCharacter((prevChar) => {
      return { ...prevChar, broom: `${prefix} ${suffix}` };
    });
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="inventory-container">
        <div className="card">
          <div className="card-title">Broom</div>
          <div className="card-content">
            <img
              className="refresh"
              src="images/refresh.svg"
              alt="refresh"
              onClick={refreshBroom}
            />
            {character.broom && <span>{character.broom}</span>}
            {!character.broom && <UnknownValue />}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Wand</div>
          <div className="card-content">
            {character.wand && <span>{character.wand}</span>}
            {!character.wand && <UnknownValue />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterInventory;
