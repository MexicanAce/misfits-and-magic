import { Dispatch, SetStateAction, useState } from 'react';
import { Character, CharacterStat } from '../../types/Character';
import { DiceType } from '../../types/Dice';
import DiceSelectModal from '../dice-select-modal/dice-select-modal';
import './dice-attribute.scss';

function DiceAttribute({
  attribute,
  character,
  setCharacter,
}: {
  attribute: string;
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  let characterStat: CharacterStat = character[
    attribute as keyof Character
  ] as CharacterStat;

  const [openDiceSelectModal, setOpenDiceSelectModal] = useState(false);
  const handleOpen = () => setOpenDiceSelectModal(true);
  const handleClose = () => setOpenDiceSelectModal(false);

  let diceShape = <></>;
  const diceGradient = (
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop
          offset="0%"
          style={{ stopColor: 'rgb(47,176,217)', stopOpacity: '1' }}
        />
        <stop
          offset="100%"
          style={{ stopColor: 'rgb(0,253,256)', stopOpacity: '1' }}
        />
      </linearGradient>
    </defs>
  );

  switch (characterStat.diceType) {
    case DiceType.D4:
      diceShape = (
        <svg width="60" height="52">
          {diceGradient}
          <polygon points="0 52,30 0,60 52" fill="url(#grad1)" />
        </svg>
      );
      break;
    case DiceType.D6:
      diceShape = (
        <svg width="60" height="60">
          {diceGradient}
          <polygon points="0 0,0 60,60 60,60 0" fill="url(#grad1)" />
        </svg>
      );
      break;
    case DiceType.D8:
      diceShape = (
        <svg width="80" height="70">
          {diceGradient}
          <polygon points="10 35,40 70,70 35,40 0" fill="url(#grad1)" />
        </svg>
      );
      break;
    case DiceType.D10:
      diceShape = (
        <svg width="80" height="80">
          {diceGradient}
          <polygon points="0 40,40 80,80 40,40 0" fill="url(#grad1)" />
        </svg>
      );
      break;
    case DiceType.D12:
    case DiceType.D20:
      diceShape = (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="66"
          height="76"
        >
          <path
            fill="url(#grad1)"
            d="M31.17691453623979 0.9999999999999999Q32.90896534380867 0 34.64101615137754 1L64.08587988004845 18Q65.81793068761733 19 65.81793068761733 21L65.81793068761733 55Q65.81793068761733 57 64.08587988004845 58L34.64101615137754 75Q32.90896534380867 76 31.17691453623979 75L1.7320508075688772 58Q0 57 0 55L0 21Q0 19 1.7320508075688774 18Z"
          ></path>
        </svg>
      );
      break;
  }

  return (
    <div className="dice-container">
      <div className="card">
        <div className="card-title">{attribute}</div>
        <div className="card-content">
          {characterStat.diceType && (
            <div
              className={`dice-svg d${characterStat.diceType}-svg`}
              onClick={handleOpen}
            >
              {diceShape}
              <div className={`dice-number d${characterStat.diceType}`}>
                {characterStat.diceType}
              </div>
            </div>
          )}
          {characterStat.modifier && characterStat.modifier != 0 && (
            <div className="modifier">
              {characterStat.modifier > 0 ? '+' : ''}
              {characterStat.modifier}
            </div>
          )}
          {characterStat.diceType && !characterStat.modifier && (
            <div className="empty-modifier"></div>
          )}
          {!characterStat.diceType && <div>?</div>}
        </div>
      </div>

      <DiceSelectModal
        character={character}
        setCharacter={setCharacter}
        open={openDiceSelectModal}
        handleClose={handleClose}
        attribute={attribute}
        characterStat={characterStat} />
    </div>
  );
}

export default DiceAttribute;
