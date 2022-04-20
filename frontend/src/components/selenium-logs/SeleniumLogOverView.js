import { VColumnCard, VRowCard } from '../common/Cards';

import moment from 'moment';

const SeleniumLogOverView = (props) => {
  return (
    <div className='secondary-colored '>
      <VRowCard>
        <VColumnCard>{props.item.id}</VColumnCard>
        <VColumnCard>{props.item.request.line_number}</VColumnCard>
        <VColumnCard>{props.item.response.line_number}</VColumnCard>
        <VColumnCard>
          {Object.keys(props.item.request.headers)
            .filter((key) => key.includes('/session'))[0]
            .split('HTTP/1.1')[0]
            .split('/')
            .slice(-1)
            .pop()}
        </VColumnCard>
        <VColumnCard>
          {props.item.response.headers.null.split(' ')[1]}
        </VColumnCard>
        <VColumnCard>
          {moment(props.item.request.created_at).utc().format('hh:mm:ss')}
        </VColumnCard>
        <VColumnCard>
          {moment(props.item.response.created_at).utc().format('hh:mm:ss')}
        </VColumnCard>
        <VColumnCard>
          {(props.item.response.in_time / 1000).toFixed(2)}
        </VColumnCard>
        <VColumnCard>
          {(props.item.request.out_time / 1000).toFixed(2)}
        </VColumnCard>
      </VRowCard>
    </div>
  );
};

export default SeleniumLogOverView;
