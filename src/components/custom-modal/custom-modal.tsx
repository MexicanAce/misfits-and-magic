import { ReactNode, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './custom-modal.scss';
import backgroundImageUrl from '../../assets/background.png';

function CustomModal({
  children,
  open,
  onClose,
  title,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem',
    backgroundImage: `url(${backgroundImageUrl})`,
    outline: 'none',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={modalStyle}>
        <div className="modal-content">
          <div className="cancel" onClick={onClose}></div>
          {title && (<h1 className="modal-title">{title}</h1>)}
          {children}
        </div>
      </Box>
    </Modal>
  );
}

export default CustomModal;
