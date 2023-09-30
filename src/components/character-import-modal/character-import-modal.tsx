import { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../types/Character';
import CustomModal from '../custom-modal/custom-modal';
import './character-import-modal.scss';

function CharacterImportModal({
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

  const [newCharacterJson, setNewCharacterJson] = useState<string>('');

  function onConfirm() {
    try {
      const newCharacter: Character = JSON.parse(newCharacterJson);
      setCharacter(newCharacter);
    } catch (error) {
      console.error(error);
    }

    handleClose();
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={'Import Character'}>
      <div className="character-import">
        <textarea
          cols={50}
          rows={20}
          value={newCharacterJson}
          onChange={(e) => setNewCharacterJson(e.target.value)} />
      </div>
      <button
        className="modal-button"
        onClick={onConfirm}>
        Confirm
      </button>
    </CustomModal>
  );
}

export default CharacterImportModal;
