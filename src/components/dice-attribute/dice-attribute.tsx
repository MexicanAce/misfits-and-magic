import { Dispatch, SetStateAction, useState } from 'react';
import { Character, CharacterStat } from '../../types/Character';
import DiceEditModal from '../dice-edit-modal/dice-edit-modal';
import DiceRollModal from '../dice-roll-modal/dice-roll-modal';
import Dice from '../dice/dice';
import UnknownValue from '../unknown-value/unknown-value';
import './dice-attribute.scss';

function DiceAttribute({
  attribute,
  character,
  setCharacter,
  isMagic,
}: {
  attribute: string;
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  isMagic: boolean;
}) {
  let characterStat: CharacterStat = character[
    attribute as keyof Character
  ] as CharacterStat;

  const [openDiceSelectModal, setOpenDiceSelectModal] = useState(false);
  const [openDiceEditModal, setOpenDiceEditModal] = useState(false);

  function handleModifierUpdate(valueDelta: number) {
    setCharacter((prevChar) => {
      // shallow copy because React rendering is complicated with dynamic typesript properties from variables
      const copyOfPrevious = JSON.parse(JSON.stringify(prevChar));
      (copyOfPrevious[attribute as keyof Character] as CharacterStat).modifier =
        ((copyOfPrevious[attribute as keyof Character] as CharacterStat).modifier ?? 0) + valueDelta;
      return copyOfPrevious;
    });
  }

  return (
    <div className="dice-container">
      <div className="card">
        <div className="card-title">
          {attribute}
          <img
            className="edit-button"
            src="images/edit.svg"
            alt="edit"
            onClick={() => setOpenDiceEditModal(true)} />
        </div>
        <div className="card-content">
          {characterStat.diceType && (
            <Dice
              value={characterStat.diceType}
              type={characterStat.diceType}
              onClick={() => setOpenDiceSelectModal(true)}
            />
          )}
          <div className="modifier-container">
            <div className="subtract-modifier" onClick={() => { handleModifierUpdate(-1) }}>-</div>
            {(characterStat.modifier != undefined && characterStat.modifier != 0) && (
              <div className="modifier">
                {characterStat.modifier > 0 ? '+' : '-'}
                {Math.abs(characterStat.modifier)}
              </div>
            )}
            {(characterStat.diceType && !characterStat.modifier) && (
              <div className="empty-modifier">0</div>
            )}
            <div className="add-modifier" onClick={() => { handleModifierUpdate(1) }}>+</div>
          </div>
          {!characterStat.diceType && <UnknownValue />}
        </div>
      </div>

      {openDiceSelectModal && (
        <DiceRollModal
          open={openDiceSelectModal}
          handleClose={() => setOpenDiceSelectModal(false)}
          characterStat={characterStat}
          isMagic={isMagic} />
      )}

      {openDiceEditModal && (
        <DiceEditModal
          character={character}
          setCharacter={setCharacter}
          open={openDiceEditModal}
          handleClose={() => setOpenDiceEditModal(false)}
          attribute={attribute}
          characterStat={characterStat} />
      )}
    </div>
  );
}

export default DiceAttribute;
