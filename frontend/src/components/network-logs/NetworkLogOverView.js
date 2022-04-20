import { VColumnCard, VRowCard } from '../common/Cards';

import moment from 'moment';

const NetworkLogOverView = (props) => {
  return (
    <div className='secondary-colored '>
      <VRowCard>
        <VColumnCard>{props.item.id}</VColumnCard>
        <VColumnCard>{props.item.request.method}</VColumnCard>
        <VColumnCard>
          {props.item.response.content.mimeType.split(';')[0]}
        </VColumnCard>
        <VColumnCard>
          {moment(props.item.startedDateTime).utc().format('hh:mm:ss')}
        </VColumnCard>
        <VColumnCard>
          {moment(props.item.startedDateTime + props.item.time)
            .utc()
            .format('hh:mm:ss')}
        </VColumnCard>
        <VColumnCard>{(props.item.time / 1000).toFixed(2)}</VColumnCard>
      </VRowCard>
    </div>
  );
};

export default NetworkLogOverView;
