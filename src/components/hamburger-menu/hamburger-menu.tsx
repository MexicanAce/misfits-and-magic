import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Character, DefaultCharacter } from '../../types/Character';
import backgroundImageUrl from '../../assets/background.png';
import './hamburger-menu.scss';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CharacterUploadModal from '../character-upload-modal/character-upload-modal';
import CreditsModal from '../credits-modal/credits-modal';
import WalletButton from '../wallet-button/wallet-button';
import Web3Context from '../../context/web3-context';
import CharacterImportModal from '../character-import-modal/character-import-modal';

function HamburgerMenu({
  character,
  setCharacter,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [openCharacterImportModal, setOpenCharacterImportModal] = useState(false);
  const [openCharacterUploadModal, setOpenCharacterUploadModal] = useState(false);
  const [openCreditsModal, setOpenCreditsModal] = useState(false);
  const web3Context = useContext(Web3Context);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportCharacter = () => {
    navigator.clipboard.writeText(JSON.stringify(character, null, 2));
    setOpenSuccessSnack(true);
    handleClose();
  };

  function resetCharacter() {
    setCharacter(DefaultCharacter);
    handleClose();
  }

  return (
    <div className="hamburger-menu">
      <img className="menu-icon" src="images/menu.svg" onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{
          backgroundImage: backgroundImageUrl
        }}
      >
        <MenuItem onClick={resetCharacter}>Reset Character</MenuItem>
        <Divider />
        <MenuItem onClick={handleExportCharacter}>
          <img src="images/download.svg" />
          Export to Clipboard
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); setOpenCharacterImportModal(true) }}>
          <img src="images/upload.svg" />
          Import Character
        </MenuItem>
        {web3Context.walletAddress && (
          <MenuItem onClick={() => { handleClose(); setOpenCharacterUploadModal(true) }}>
            <img src="images/upload.svg" />
            Upload Character
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => { handleClose(); setOpenCreditsModal(true) }}>Credits</MenuItem>
        <Divider />
        {web3Context.provider && (
          <WalletButton
            character={character}
            setCharacter={setCharacter}
          />
        )}
      </Menu>

      {openCharacterImportModal && (
        <CharacterImportModal
          character={character}
          setCharacter={setCharacter}
          open={openCharacterImportModal}
          handleClose={() => setOpenCharacterImportModal(false)}
        />
      )}

      {openCharacterUploadModal && (
        <CharacterUploadModal
          character={character}
          setCharacter={setCharacter}
          open={openCharacterUploadModal}
          handleClose={() => setOpenCharacterUploadModal(false)}
        />
      )}

      {openCreditsModal && (
        <CreditsModal
          open={openCreditsModal}
          handleClose={() => setOpenCreditsModal(false)}
        />
      )}

      <Snackbar open={openSuccessSnack} autoHideDuration={3000} onClose={() => { setOpenSuccessSnack(false) }}>
        <Alert onClose={() => { setOpenSuccessSnack(false) }} severity="success" sx={{ width: '100%' }}>
          Character copied to your clipboard
        </Alert>
      </Snackbar>
    </div>
  );
}

export default HamburgerMenu;
