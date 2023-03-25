import { MouseEventHandler } from 'react';
import './unknown-value.scss';

function UnknownValue({
  onClick,
}: {
  onClick?: MouseEventHandler | undefined;
}) {
  return (
    <div className='unknown-value' onClick={onClick}>?</div>
  );
}

export default UnknownValue;
