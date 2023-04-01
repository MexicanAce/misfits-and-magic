import { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../types/Character';
import CustomSwitch from '../custom-switch/custom-switch';
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
  const [useMagic, setUseMagic] = useState(false);

  function updateAdversity(delta: number) {
    setCharacter((prevChar) => {
      let newValue = prevChar.adversityTokens + delta;
      if (newValue < 0) {
        newValue = 0;
      }

      return { ...prevChar, adversityTokens: newValue }
    });
  }

  return (
    <div className="attributes-container">
      <div className="dice-container">
        <div className="dice-controller">
          <div className="is-magic-roll">
            <CustomSwitch value={useMagic} setValue={setUseMagic} label="Magic Roll (+D4)" labelOnRight={true} />
          </div>
        </div>
        <div className="dice-attributes">
          {attributes.map((attribute) => {
            return (
              <DiceAttribute
                key={attribute}
                attribute={attribute}
                character={character}
                setCharacter={setCharacter}
                isMagic={useMagic}
              />
            );
          })}
        </div>
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
                    <img src={character.house.logoUrl} className="house-logo" />
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
              <div className="adversity-tokens">
                <span className="token-count">
                  {character.adversityTokens}
                </span>
                {character.adversityTokens == 1 ? 'Token' : 'Tokens'}

                {character.adversityTokens > 0 && (
                  <div className="subtract-modifier" onClick={() => { updateAdversity(-1) }}>-</div>
                )}
                <div className="add-modifier" onClick={() => { updateAdversity(1) }}>+</div>
              </div>
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
