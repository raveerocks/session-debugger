import { RowCard, TableCard, VHColumnCenterCard } from '../common/Cards';
import { useEffect, useState } from 'react';

import SessionLogOverView from './SessionLogOverView';
import Slider from '../common/Slider';
import { getSessionLogsExchanges } from '../../controllers/SessionLogsController';

const SessionLogOverViewList = (props) => {
  const [result, setResult] = useState([]);
  const [seleniumOffset, setSeleniumOffset] = useState(0);
  const [networkOffset, setNetworkOffset] = useState(0);

  const setSeleniumOffsetValue = (value) => {
    setSeleniumOffset(value * 1000);
  };

  const setNetworkOffsetValue = (value) => {
    setNetworkOffset(value * 1000);
  };

  useEffect(() => {
    getSessionLogsExchanges(props.category, props.session)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.category, props.session]);

  return (
    result && (
      <TableCard>
        <Slider
          title={'Selenium Offset'}
          min={-60}
          max={60}
          step={1}
          default={0}
          onChange={setSeleniumOffsetValue}
        />
        <Slider
          title={'Network Offset'}
          min={-60}
          max={60}
          step={1}
          default={0}
          onChange={setNetworkOffsetValue}
        />

        <div
          className='primary-dark-colored'
          style={{
            boxShadow: '10px 10px 10px #000000',
            margin: '10px',
          }}
        >
          <RowCard>
            <VHColumnCenterCard>{`Id`}</VHColumnCenterCard>
            <VHColumnCenterCard>{`Line Start`}</VHColumnCenterCard>
            <VHColumnCenterCard>{`Line End`}</VHColumnCenterCard>
            <VHColumnCenterCard>{`Type`}</VHColumnCenterCard>
            <VHColumnCenterCard>{`Action`}</VHColumnCenterCard>
            <VHColumnCenterCard>{`Received At`}</VHColumnCenterCard>
            <VHColumnCenterCard>Responded At</VHColumnCenterCard>
            <VHColumnCenterCard>Inside Time(S)</VHColumnCenterCard>
            <VHColumnCenterCard>Outside Time(S)</VHColumnCenterCard>
            <VHColumnCenterCard></VHColumnCenterCard>
            <VHColumnCenterCard>Actions</VHColumnCenterCard>
            <VHColumnCenterCard></VHColumnCenterCard>
          </RowCard>
        </div>
        {result.map((logItem) => {
          return (
            <div
              key={logItem.id}
              className='primary-dark-colored'
              style={{
                boxShadow: '10px 10px 10px #000000',
                margin: '10px',
              }}
            >
              <SessionLogOverView
                category={props.category}
                session={props.session}
                item={logItem}
                seleniumOffset={seleniumOffset}
                networkOffset={networkOffset}
              />
            </div>
          );
        })}
      </TableCard>
    )
  );
};

export default SessionLogOverViewList;
