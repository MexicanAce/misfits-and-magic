import { Dispatch, SetStateAction } from 'react';
import { Character, DefaultCharacter } from '../../types/Character';
import CustomModal from '../custom-modal/custom-modal';
import './create-new-character-modal.scss';

function CreateNewCharacterModal({
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

  function onConfirm() {
    setCharacter(DefaultCharacter);
    handleClose();
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={'Welcome!'}>
      <div className="create-new-character">
        <p>
          Your wallet doesn't appear to have any characters, would you like to start a new one?
        </p>
        <p>
          Tip: Use "Upload Character" to save your changes
        </p>
      </div>

      <button
        onClick={onConfirm}>
        Reset To New Character
      </button>
      <button
        className="cancel-button"
        onClick={handleClose}>
        Cancel
      </button>
    </CustomModal>
  );
}

export default CreateNewCharacterModal;
