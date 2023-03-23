import { Dispatch, SetStateAction, useState } from 'react';
import { Character, CharacterStat } from '../../types/Character';
import DiceSelectModal from '../dice-select-modal/dice-select-modal';
import Dice from '../dice/dice';
import './dice-attribute.scss';

function DiceAttribute({
  attribute,
  character,
  setCharacter,
}: {
  attribute: string;
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  let characterStat: CharacterStat = character[
    attribute as keyof Character
  ] as CharacterStat;

  const [openDiceSelectModal, setOpenDiceSelectModal] = useState(false);
  const handleOpen = () => setOpenDiceSelectModal(true);
  const handleClose = () => setOpenDiceSelectModal(false);

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
        <div className="card-title">{attribute}</div>
        <div className="card-content">
          {characterStat.diceType && (
            <Dice
              value={characterStat.diceType}
              type={characterStat.diceType}
              onClick={handleOpen}
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
          {!characterStat.diceType && <div>?</div>}
        </div>
      </div>

      <DiceSelectModal
        character={character}
        setCharacter={setCharacter}
        open={openDiceSelectModal}
        handleClose={handleClose}
        attribute={attribute}
        characterStat={characterStat} />
    </div>
  );
}

export default DiceAttribute;
