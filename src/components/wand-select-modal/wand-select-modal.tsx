import { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../types/Character';
import { WandCores, WandWoodTypes } from '../../types/Wands';
import CustomModal from '../custom-modal/custom-modal';
import './wand-select-modal.scss';

function WandSelectModal({
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

  const [newWandWoodSelected, setNewWandWoodSelected] = useState<string>(character.wand?.wood ?? WandWoodTypes[0]);
  const [newWandCoreSelected, setNewWandCoreSelected] = useState<string>(character.wand?.core ?? WandCores[0]);

  function onConfirm() {
    setCharacter((prevChar) => {
      return { ...prevChar, wand: { wood: newWandWoodSelected, core: newWandCoreSelected } }
    });

    handleClose();
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={`Choose a Wand`}>
      <div className="wand-selector">
        <div className="wood-container">
          <label>Wood Type:</label>
          <select value={newWandWoodSelected} onChange={(e) => { setNewWandWoodSelected(e.target.value) }}>
            {WandWoodTypes.map((woodType, woodIndex) => (
              <option value={woodType} key={woodIndex}>{woodType}</option>
            ))}
          </select>
        </div>
        <div className="core-container">
          <label>Wand Core:</label>
          <select value={newWandCoreSelected} onChange={(e) => { setNewWandCoreSelected(e.target.value) }}>
            {WandCores.map((core, coreIndex) => (
              <option value={core} key={coreIndex}>{core}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="modal-button"
        onClick={onConfirm}>
        Confirm
      </button>
    </CustomModal>
  );
}

export default WandSelectModal;
