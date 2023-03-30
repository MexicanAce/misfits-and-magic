import { Dispatch, SetStateAction, useState } from 'react';
import { BroomPrefixes, BroomSuffixes } from '../../types/Brooms';
import { Character } from '../../types/Character';
import UnknownValue from '../unknown-value/unknown-value';
import WandSelectModal from '../wand-select-modal/wand-select-modal';
import './character-inventory.scss';

function CharacterInventory({
  character,
  setCharacter,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  const [openWandSelectModal, setOpenWandSelectModal] = useState(false);

  function refreshBroom() {
    const prefix =
      BroomPrefixes[Math.floor(Math.random() * BroomPrefixes.length)];
    const suffix =
      BroomSuffixes[Math.floor(Math.random() * BroomSuffixes.length)];

    setCharacter((prevChar) => {
      return { ...prevChar, broom: `${prefix} ${suffix}` };
    });
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="inventory-container">
        <div className="card">
          <div className="card-title">Broom</div>
          <div className="card-content">
            <img
              className="refresh"
              src="images/refresh.svg"
              alt="refresh"
              onClick={refreshBroom}
            />
            {character.broom && <span>{character.broom}</span>}
            {!character.broom && <UnknownValue />}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Wand</div>
          <div className="card-content">
            {character.wand && (
              <div className="wand-description" onClick={() => setOpenWandSelectModal(true)}>
                <span>{character.wand.wood},</span>
                <span>{character.wand.core} Core</span>
              </div>
            )}
            {!character.wand && <UnknownValue onClick={() => setOpenWandSelectModal(true)} />}
          </div>
        </div>
      </div>

      {openWandSelectModal && (
        <WandSelectModal
          character={character}
          setCharacter={setCharacter}
          open={openWandSelectModal}
          handleClose={() => setOpenWandSelectModal(false)}
        />
      )}
    </div>
  );
}

export default CharacterInventory;
