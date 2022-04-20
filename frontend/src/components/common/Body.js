import { Chart as ChartJS } from 'chart.js/auto';
import Results from './Results';
import SearchBar from './SearchBar';
import { SectionCard } from './Cards';
import { useState } from 'react';

const Body = () => {
  const [sessionId, setSessionId] = useState();
  const [catergory, setCategory] = useState();

  const setValues = (sessionId, catergory) => {
    setSessionId(sessionId);
    setCategory(catergory);
  };

  return (
    <div className='margin-wrapper-medium'>
      <div className='container-fluid padding-wrapper-small'>
        <SectionCard>
          <SearchBar
            onClick={(searchSessionId, searchCatergory) =>
              setValues(searchSessionId, searchCatergory)
            }
          />
        </SectionCard>
        {sessionId && <Results category={catergory} session={sessionId} />}
      </div>
    </div>
  );
};
export default Body;
