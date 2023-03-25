import { Dispatch, SetStateAction, useState } from 'react';
import { Character, CharacterStat } from '../../types/Character';
import { House, Houses } from '../../types/House';
import CustomModal from '../custom-modal/custom-modal';
import './house-select-modal.scss';

function HouseSelectModal({
  character,
  setCharacter,
  open,
  handleClose,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  open: boolean;
  handleClose: () => void;
}) {

  const [newHouseSelected, setNewHouseSelected] = useState<House | undefined>(character.house);

  function onConfirm() {
    if (newHouseSelected == undefined)
      return;

    setCharacter((prevChar) => {
      return { ...prevChar, house: newHouseSelected, robeColorHue: newHouseSelected.colorHue }
    });

    handleClose();
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={`Select a House`}>
      <div className="house-selector">
        {Houses.map(house => (
          <div
            key={house.id}
            className={`house-container ${house.id == newHouseSelected?.id ? 'current-house' : ''}`}
            onClick={() => setNewHouseSelected(house)}>
            <img src={house.logoUrl} className="house-logo" />
            {house.name}
          </div>
        ))
        }
      </div>
      <button
        className="modal-button"
        onClick={onConfirm}
        disabled={newHouseSelected == character.house}>
        Confirm
      </button>
    </CustomModal>
  );
}

export default HouseSelectModal;
