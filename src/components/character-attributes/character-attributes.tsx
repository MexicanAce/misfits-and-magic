import { Dispatch, SetStateAction } from 'react';
import { Character } from '../../types/Character';
import DiceAttribute from '../dice-attribute/dice-attribute';
import UnknownValue from '../unknown-value/unknown-value';
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
      <div className="extra-attributes">
        <div className="house-container">
          <div className="card">
            <div className="card-title">House</div>
            <div className="card-content">
              {character.house ?? <UnknownValue />}
            </div>
          </div>
        </div>
        <div className="adversity-container">
          <div className="card">
            <div className="card-title">Adversity</div>
            <div className="card-content">
              {character.adversityTokens}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterAttributes;
