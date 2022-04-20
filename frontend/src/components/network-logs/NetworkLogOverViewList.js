import { HColumnCard, RowCard, TableCard } from '../common/Cards';
import { useEffect, useState } from 'react';

import NetworkLogOverView from './NetworkLogOverView';
import { getNetworkLogsExchanges } from '../../controllers/NetworkLogsController';

const NetworkLogOverViewList = (props) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getNetworkLogsExchanges(
      props.category,
      props.session,
      props.from,
      props.to,
      props.offset
    )
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.category, props.session, props.from, props.to, props.offset]);
  return (
    result &&
    result.length > 0 && (
      <TableCard>
        <div className='primary-colored'>
          <RowCard>
            <HColumnCard>Id</HColumnCard>
            <HColumnCard>Method</HColumnCard>
            <HColumnCard>MIME Type</HColumnCard>
            <HColumnCard>Received At</HColumnCard>
            <HColumnCard>Responded At</HColumnCard>
            <HColumnCard>Inside Time(S)</HColumnCard>
          </RowCard>
        </div>
        {result.map((logItem) => {
          return (
            <div key={logItem.id} style={{}}>
              <NetworkLogOverView item={logItem} />
            </div>
          );
        })}
      </TableCard>
    )
  );
};

export default NetworkLogOverViewList;
