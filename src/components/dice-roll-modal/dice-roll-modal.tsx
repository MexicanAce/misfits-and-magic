import { Fragment, useEffect, useState } from 'react';
import { CharacterStat } from '../../types/Character';
import './dice-roll-modal.scss';
import Dice from '../dice/dice';
import { DiceRoll, DiceType } from '../../types/Dice';
import CustomModal from '../custom-modal/custom-modal';

function DiceRollModal({
  open,
  handleClose,
  characterStat,
  isMagic,
}: {
  open: boolean;
  handleClose: () => void;
  characterStat: CharacterStat;
  isMagic: boolean;
}) {

  const [diceRollComplete, setDiceRollComplete] = useState<boolean>(false);
  const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);

  function rollDice(isMagicAction: boolean) {
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

    if (isMagicAction) {
      const magicRoll: DiceRoll = {
        value: Math.ceil(Math.random() * DiceType.D4),
        maxValue: DiceType.D4,
        isMagic: true,
      };
      setDiceRolls(previous => [...previous, magicRoll]);
    }

    setDiceRollComplete(true);
  }

  useEffect(() => {
    rollDice(isMagic);

    return () => {
      setDiceRolls([]);
    }
  }, []);

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={undefined}>

      {!diceRollComplete && (
        <div className="roll-in-progess">Rolling...</div>
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
    </CustomModal>
  );
}

export default DiceRollModal;
