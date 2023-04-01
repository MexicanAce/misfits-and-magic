import React, { MouseEventHandler } from 'react';
import { DiceType } from '../../types/Dice';
import './dice.scss';

function Dice({
  value,
  type,
  onClick,
  className = '',
  isClickable = true,
  isExploding = false,
  isRolling = false,
  isMagic = false,
}: {
  value: number | undefined;
  type: DiceType | undefined;
  onClick?: MouseEventHandler | undefined;
  className?: string;
  isClickable?: boolean;
  isExploding?: boolean;
  isRolling?: boolean;
  isMagic?: boolean;
}) {

  let diceShape = <></>;
  const diceGradient = !isMagic ? (
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
  ) :
    (
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: 'rgb(290, 290, 290)', stopOpacity: '1' }}
          />
          <stop
            offset="100%"
            style={{ stopColor: 'rgb(100, 100, 100)', stopOpacity: '1' }}
          />
        </linearGradient>
      </defs>
    );

  switch (type) {
    case DiceType.D4:
      diceShape = (
        <svg width="72" height="72" viewBox='0 0 72 72'>
          {diceGradient}
          <polygon points="0 67,36 5,72 67" fill={`url(#${isMagic ? 'grad2' : 'grad1'})`} />
        </svg>
      );
      break;
    case DiceType.D6:
      diceShape = (
        <svg width="60" height="60" viewBox='0 0 60 60'>
          {diceGradient}
          <polygon points="5 5,5 55,55 55,55 5" fill={`url(#${isMagic ? 'grad2' : 'grad1'})`} />
        </svg>
      );
      break;
    case DiceType.D8:
      diceShape = (
        <svg width="60" height="70" viewBox='0 0 60 70'>
          {diceGradient}
          <polygon points="0 35,30 70,60 35,30 0" fill={`url(#${isMagic ? 'grad2' : 'grad1'})`} />
        </svg>
      );
      break;
    case DiceType.D10:
      diceShape = (
        <svg width="80" height="80" viewBox='0 0 80 80'>
          {diceGradient}
          <polygon points="0 40,40 80,80 40,40 0" fill={`url(#${isMagic ? 'grad2' : 'grad1'})`} />
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
          viewBox='0 0 66 76'
        >
          {diceGradient}
          <path
            fill={`url(#${isMagic ? 'grad2' : 'grad1'})`}
            d="M31.17691453623979 0.9999999999999999Q32.90896534380867 0 34.64101615137754 1L64.08587988004845 18Q65.81793068761733 19 65.81793068761733 21L65.81793068761733 55Q65.81793068761733 57 64.08587988004845 58L34.64101615137754 75Q32.90896534380867 76 31.17691453623979 75L1.7320508075688772 58Q0 57 0 55L0 21Q0 19 1.7320508075688774 18Z"
          ></path>
        </svg>
      );
      break;
  }

  return (
    <div
      className={`dice-svg d${type}-svg ${isClickable ? 'clickable' : ''} ${isMagic ? 'magic' : ''} ${isExploding ? 'exploding' : ''} ${className}`}
      onClick={onClick}
    >
      {diceShape}
      <div className={`dice-number d${type}`}>
        {value}
      </div>

      {isExploding && (
        <div className="sparkler-light">
          <div className="spark" style={{ "--spark-rotate": "10deg", "--spark-delay": "223ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "10deg", "--spark-delay": "223ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "20deg", "--spark-delay": "844ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "30deg", "--spark-delay": "130ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "40deg", "--spark-delay": "747ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "50deg", "--spark-delay": "928ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "60deg", "--spark-delay": "392ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "70deg", "--spark-delay": "483ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "80deg", "--spark-delay": "621ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "90deg", "--spark-delay": "814ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "100deg", "--spark-delay": "802ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "110deg", "--spark-delay": "837ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "120deg", "--spark-delay": "238ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "130deg", "--spark-delay": "642ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "140deg", "--spark-delay": "58ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "150deg", "--spark-delay": "404ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "160deg", "--spark-delay": "576ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "170deg", "--spark-delay": "944ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "180deg", "--spark-delay": "635ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "190deg", "--spark-delay": "205ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "200deg", "--spark-delay": "91ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "210deg", "--spark-delay": "829ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "220deg", "--spark-delay": "969ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "230deg", "--spark-delay": "861ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "240deg", "--spark-delay": "201ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "250deg", "--spark-delay": "173ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "260deg", "--spark-delay": "967ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "270deg", "--spark-delay": "548ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "280deg", "--spark-delay": "392ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "290deg", "--spark-delay": "273ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "300deg", "--spark-delay": "6ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "310deg", "--spark-delay": "1ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "320deg", "--spark-delay": "854ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "330deg", "--spark-delay": "159ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "340deg", "--spark-delay": "60ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "350deg", "--spark-delay": "986ms" } as React.CSSProperties}></div>
          <div className="spark" style={{ "--spark-rotate": "360deg", "--spark-delay": "559ms" } as React.CSSProperties}></div>
        </div>
      )}
    </div>
  );
}

export default Dice;
