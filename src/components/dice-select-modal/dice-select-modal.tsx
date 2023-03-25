import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Character, CharacterStat } from '../../types/Character';
import './dice-select-modal.scss';
import Dice from '../dice/dice';
import { DiceRoll, DiceType } from '../../types/Dice';
import CustomModal from '../custom-modal/custom-modal';

function DiceSelectModal({
  character,
  setCharacter,
  open,
  handleClose,
  attribute,
  characterStat,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  open: boolean;
  handleClose: () => void;
  attribute: string;
  characterStat: CharacterStat;
}) {

  const [showRoll, setShowRoll] = useState<boolean>(false);
  const [showEditDie, setShowEditDie] = useState<boolean>(false);
  const [diceRollComplete, setDiceRollComplete] = useState<boolean>(false);
  const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);
  const [newDieSelected, setNewDieSelected] = useState<DiceType | undefined>(characterStat.diceType);

  function rollDice(isMagic: boolean) {
    if (!characterStat.diceType) {
      setDiceRollComplete(false);
      return;
    }

    const roll: DiceRoll = {
      value: Math.ceil(Math.random() * characterStat.diceType),
      maxValue: characterStat.diceType,
      isMagic: false,
    };
    setDiceRolls(previous => [...previous, roll]);

    // Explode on max roll
    if (roll.value == roll.maxValue) {
      rollDice(false);
    }

    if (diceRollComplete) {
      return;
    }

    if (isMagic) {
      const magicRoll: DiceRoll = {
        value: Math.ceil(Math.random() * DiceType.D4),
        maxValue: DiceType.D4,
        isMagic: true,
      };
      setDiceRolls(previous => [...previous, magicRoll]);
    }

    setDiceRollComplete(true);
  }

  function onConfirmDieUpdate() {
    setCharacter((prevChar) => {
      const copyOfPrevious = { ...prevChar };
      (copyOfPrevious[attribute as keyof Character] as CharacterStat).diceType = newDieSelected;
      return copyOfPrevious;
    });
    handleClose();
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={showEditDie ? `Assign Die for ${attribute}` : undefined}>
      {!showRoll && !showEditDie && (
        <>
          <button className="modal-action-button" onClick={() => { setShowRoll(value => !value); rollDice(true); }}>Cast Magic (+D4)</button>
          <button className="modal-action-button" onClick={() => { setShowRoll(value => !value); rollDice(false); }}>Normal Action</button>
          <button className="modal-button" onClick={() => { setShowEditDie(value => !value) }}>Edit Die</button>
        </>
      )}

      {diceRollComplete && (
        <>
          <div className="roll-results">
            {diceRolls.map((roll, rollIndex) =>
            (
              <Fragment key={rollIndex}>
                {rollIndex > 0 ? (<span className='plus'>+</span>) : (<></>)}
                <Dice
                  value={roll.value}
                  type={roll.maxValue}
                  isClickable={false}
                  isExploding={roll.value == roll.maxValue && !roll.isMagic}
                  isMagic={roll.isMagic} />
              </Fragment>
            )
            )}

            {characterStat.modifier && (
              <>
                {characterStat.modifier > 0 ?
                  (<span className="plus">+</span>) :
                  (<span className="minus">-</span>)}
                <div className="modifier-roll-value">{Math.abs(characterStat.modifier)}</div>
              </>
            )}

            <div className="equals">=</div>
            {diceRollComplete && (
              <div className="roll-total">
                {diceRolls.reduce((acc, currentRoll) => acc + currentRoll.value, 0) + (characterStat.modifier ?? 0)}
              </div>
            )}
          </div>
          <button className="modal-button" onClick={handleClose} style={{ marginTop: '1rem' }}>OK</button>
        </>
      )}

      {showEditDie && (
        <>
          <div className="dice-selector">
            <>
              {Object.values(DiceType)
                .filter(x => { return typeof x == 'number' })
                .map((diceType, diceTypeIndex) => (
                  <Dice
                    key={diceTypeIndex}
                    className={newDieSelected == diceType as DiceType ? 'selected-die' : 'unselected-die'}
                    value={diceType as number}
                    type={diceType as number}
                    isMagic={newDieSelected != diceType as number}
                    onClick={() => { setNewDieSelected(diceType as DiceType) }} />
                ))
              }
            </>
          </div>
          <button
            className="modal-button"
            onClick={onConfirmDieUpdate}
            disabled={newDieSelected == characterStat.diceType}>
            Confirm
          </button>
        </>
      )}
    </CustomModal>
  );
}

export default DiceSelectModal;
