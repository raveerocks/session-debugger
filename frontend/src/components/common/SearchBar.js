import './SearchBar.css';

import { useState } from 'react';

const SearchBar = (props) => {
  const [sessionId, setSessionId] = useState();
  const [catergory, setCategory] = useState('automate');

  const onSessionIdChange = (event) => {
    setSessionId(event.target.value);
  };

  return (
    <div className='padding-wrapper-large'>
      <div className='input-group'>
        <input
          className='secondary-colored searchbar'
          placeholder='Session Id'
          type='text'
          onChange={onSessionIdChange}
        />
        <div className='input-group-append'>
          <button
            className='button searchButton primary-dark-colored padding-wrapper-medium'
            onClick={() => props.onClick(sessionId, catergory)}
          >
            Find
          </button>
        </div>
        <div className=' input-group-append margin-wrapper-small bordered-wrapper round-wrapper-small padding-wrapper-small category-filter'>
          <input
            type='checkbox'
            className='margin-wrapper-medium'
            value={catergory === 'automate'}
            onClick={() => {
              catergory === 'automate'
                ? setCategory('app-automate')
                : setCategory('automate');
            }}
          />
          <label className='margin-wrapper-small'>App Automate</label>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
