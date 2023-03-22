import { Dispatch, SetStateAction } from 'react';
import { Character } from '../../types/Character';
import DiceAttribute from '../dice-attribute/dice-attribute';
import './character-attributes.scss';

function CharacterAttributes({
  character,
  setCharacter,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  const attributes = ['fight', 'brains', 'charm', 'flight', 'brawn', 'grit'];

  return (
    <div className="attributes-container">
      <div className="dice-attributes">
        {attributes.map((attribute) => {
          return (
            <DiceAttribute
              key={attribute}
              attribute={attribute}
              character={character}
              setCharacter={setCharacter}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CharacterAttributes;
