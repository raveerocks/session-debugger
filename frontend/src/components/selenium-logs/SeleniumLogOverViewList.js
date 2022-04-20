import { HColumnCard, RowCard, TableCard } from '../common/Cards';
import { useEffect, useState } from 'react';

import SeleniumLogOverView from './SeleniumLogOverView';
import { getSeleniumLogsExchanges } from '../../controllers/SeleniumLogsController';

const SeleniumLogOverViewList = (props) => {
  const [result, setResult] = useState();

  useEffect(() => {
    getSeleniumLogsExchanges(
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
            <HColumnCard>Line Start</HColumnCard>
            <HColumnCard>Line End</HColumnCard>
            <HColumnCard>Action</HColumnCard>
            <HColumnCard>Status</HColumnCard>
            <HColumnCard>Received At</HColumnCard>
            <HColumnCard>Responded At</HColumnCard>
            <HColumnCard>Inside Time(S)</HColumnCard>
            <HColumnCard>Outside Time(S)</HColumnCard>
          </RowCard>
        </div>
        {result.map((logItem) => {
          return (
            <div key={logItem.id}>
              <SeleniumLogOverView item={logItem} />
            </div>
          );
        })}
      </TableCard>
    )
  );
};

export default SeleniumLogOverViewList;
