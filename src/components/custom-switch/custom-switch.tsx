import { Dispatch, SetStateAction } from 'react';
import './custom-switch.scss';

function CustomSwitch({
  value,
  setValue,
  label,
  labelOnRight = false,
}: {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  label?: string;
  labelOnRight?: boolean;
}) {
  function toggleValue() {
    setValue(previousValue => !previousValue);
  }

  return (
    <div
      className="custom-switch-container"
      onClick={toggleValue}
      style={{ flexDirection: labelOnRight ? 'row-reverse' : 'row' }}>
      <label className={`switch-label ${value ? 'switch-label-selected' : ''}`}>
        {label}
      </label>
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={value}
          value={`${value}`}
          onChange={toggleValue} />
        <span className={`slider ${value ? 'slider-selected' : ''}`}></span>
      </label>
    </div>
  );
}

export default CustomSwitch;
