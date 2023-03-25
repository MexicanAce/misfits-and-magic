import { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../types/Character';
import DiceAttribute from '../dice-attribute/dice-attribute';
import HouseSelectModal from '../house-select-modal/house-select-modal';
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

  const [openHouseSelectModal, setOpenHouseSelectModal] = useState(false);

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
              {character.house == undefined ?
                (
                  <UnknownValue onClick={() => setOpenHouseSelectModal(true)} />
                ) : (
                  <div
                    className="house-name"
                    onClick={() => setOpenHouseSelectModal(true)}>
                    {character.house.name}
                  </div>
                )}
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

      {openHouseSelectModal && (
        <HouseSelectModal
          character={character}
          setCharacter={setCharacter}
          open={openHouseSelectModal}
          handleClose={() => setOpenHouseSelectModal(false)} />
      )}
    </div>
  );
}

export default CharacterAttributes;
