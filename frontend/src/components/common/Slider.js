import { useState } from 'react';
const Slider = (props) => {
  const [value, setValue] = useState(props.default);

  const changeOffset = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div
      className='bordered-wrapper round-wrapper-small margin-wrapper-small'
      style={{ textAlign: 'center' }}
    >
      <h5>{props.title}</h5>
      <div>
        <input
          value={props.value}
          type={'range'}
          min={props.min}
          max={props.max}
          step={props.step}
          className={'slider'}
          onChange={changeOffset}
        />
        <h6>{value} s</h6>
      </div>
    </div>
  );
};

export default Slider;
