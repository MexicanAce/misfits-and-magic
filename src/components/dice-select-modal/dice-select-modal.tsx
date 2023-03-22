import { Dispatch, SetStateAction } from 'react';
import { Character } from '../../types/Character';
import './dice-select-modal.scss';

function DiceSelectModal({
  character,
  setCharacter,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  return (
    <div className="model-container">
      <img className="character" src={character.imageUrl} alt="character-png" />
      <img className="stand" src="src/assets/stand.png" alt="stand-png" />
    </div>
  );
}

export default DiceSelectModal;
