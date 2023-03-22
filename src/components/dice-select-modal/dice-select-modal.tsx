import { Dispatch, SetStateAction, useState } from 'react';
import { Character, CharacterStat } from '../../types/Character';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './dice-select-modal.scss';

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
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black',
    borderRadius: '10%',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={modalStyle}>
        <div className="modal-content">
          <div className="cancel" onClick={handleClose}>X</div>
          <button className="modal-action-button">Cast Magic (+D4)</button>
          <button className="modal-action-button">Normal Action</button>
          <button className="modal-button">Edit Die</button>
        </div>
      </Box>
    </Modal>
  );
}

export default DiceSelectModal;
