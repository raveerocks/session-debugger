import { VColumnCard, VRowCard } from '../common/Cards';

import { Button } from 'react-bootstrap';
import { MdOutlineNetworkCheck } from 'react-icons/md';
import NetworkLogOverViewList from '../network-logs/NetworkLogOverViewList';
import SeleniumLogOverViewList from '../selenium-logs/SeleniumLogOverViewList';
import { SiSelenium } from 'react-icons/si';
import moment from 'moment';
import { useState } from 'react';

const SessionLogOverView = (props) => {
  const [detailsShown, setDetailsShown] = useState('');

  const actions = props.item.request.action.split('/');
  const action = actions[actions.length - 1];
  const displayAction = action.length > 10 ? 'session' : action;

  return (
    <div className='secondary-colored primary-dark-wrapper'>
      <VRowCard className='table-center-col'>
        <VColumnCard>{`${props.item.id}`.padEnd(2, ' ')}</VColumnCard>
        <VColumnCard>
          {`${props.item.request.line_number}`.padEnd(3, ' ')}
        </VColumnCard>
        <VColumnCard>
          {`${props.item.response.line_number}`.padEnd(3, ' ')}
        </VColumnCard>
        <VColumnCard>
          {`${props.item.request.http_type}`.padEnd(10, ' ')}
        </VColumnCard>
        <VColumnCard>{`${displayAction}`.padEnd(15, ' ')}</VColumnCard>

        <VColumnCard>
          {`${moment(props.item.request.created_at)
            .utc()
            .format('hh:mm:ss')}`.padEnd(8, ' ')}
        </VColumnCard>

        <VColumnCard>
          {`${moment(props.item.response.created_at)
            .utc()
            .format('hh:mm:ss')}`.padEnd(8, ' ')}
        </VColumnCard>

        <VColumnCard>
          {`${(props.item.response.in_time / 1000).toFixed(2)}`.padEnd(7, ' ')}
        </VColumnCard>

        <VColumnCard>
          {`${(props.item.request.out_time / 1000).toFixed(2)}`.padEnd(7, ' ')}
        </VColumnCard>

        <VColumnCard>
          <Button
            className='primary-dark-colored'
            onClick={() =>
              setDetailsShown(detailsShown === 'selenium' ? '' : 'selenium')
            }
          >
            <SiSelenium style={{ width: '100%', height: '50%' }} />
          </Button>
        </VColumnCard>
        <VColumnCard>
          <Button
            className='primary-dark-colored'
            onClick={() =>
              setDetailsShown(detailsShown === 'network' ? '' : 'network')
            }
          >
            <MdOutlineNetworkCheck />
          </Button>
        </VColumnCard>
      </VRowCard>

      {detailsShown === 'selenium' && (
        <SeleniumLogOverViewList
          category={props.category}
          session={props.session}
          from={props.item.request.created_at}
          to={props.item.response.created_at}
          offset={props.seleniumOffset}
        />
      )}

      {detailsShown === 'network' && (
        <NetworkLogOverViewList
          category={props.category}
          session={props.session}
          from={props.item.request.created_at}
          to={props.item.response.created_at}
          offset={props.networkOffset}
        />
      )}
    </div>
  );
};

export default SessionLogOverView;
