import { Dispatch, SetStateAction, useState } from 'react';
import { Character, CharacterStat } from '../../types/Character';
import './dice-edit-modal.scss';
import Dice from '../dice/dice';
import { DiceType } from '../../types/Dice';
import CustomModal from '../custom-modal/custom-modal';

function DiceEditModal({
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
  const [newDieSelected, setNewDieSelected] = useState<DiceType | undefined>(characterStat.diceType);

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
      title={`Assign Die for ${attribute}`}>
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
    </CustomModal>
  );
}

export default DiceEditModal;
