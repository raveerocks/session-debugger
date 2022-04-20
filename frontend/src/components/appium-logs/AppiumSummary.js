import {
  BsClockFill,
  BsFillFileEarmarkTextFill,
  BsUiChecks,
} from 'react-icons/bs';
import { Column, Row, Table } from '../common/Table';
import {
  DivisionCard,
  SectionItemCard,
  VColumnCard,
  VHColumnCard,
  VRowCard,
  VTableCard,
} from '../common/Cards';
import { useEffect, useState } from 'react';

import { Pie } from 'react-chartjs-2';
import { getAppiumLogsSummary } from '../../controllers/AppiumLogsController';
import moment from 'moment';

const AppiumSummary = (props) => {
  const [result, setResult] = useState();

  useEffect(() => {
    getAppiumLogsSummary(props.category, props.session)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.category, props.session]);

  return (
    result && (
      <DivisionCard>
        <SectionItemCard title='Log Summary' icon={BsFillFileEarmarkTextFill}>
          <Table>
            <Row>
              <Column>
                <VTableCard>
                  <VRowCard>
                    <VHColumnCard>Requests</VHColumnCard>
                    <VColumnCard>{result.total_requests}</VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Dialect</VHColumnCard>
                    <VColumnCard>{result.dialect}</VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Session Started At</VHColumnCard>
                    <VColumnCard>
                      {moment(result.session_started_at)
                        .utc()
                        .format('DD-MMM-YYYY hh:mm:ss')}
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Driver Started At</VHColumnCard>
                    <VColumnCard>
                      {moment(result.driver_started_at)
                        .utc()
                        .format('DD-MMM-YYYY hh:mm:ss')}
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Session Completed At</VHColumnCard>
                    <VColumnCard>
                      {moment(result.session_completed_at)
                        .utc()
                        .format('DD-MMM-YYYY hh:mm:ss')}
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Driver Init Time</VHColumnCard>
                    <VColumnCard>
                      {(result.driver_init_time / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Session Duration</VHColumnCard>
                    <VColumnCard>
                      {(result.seesion_duration / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Setup Time</VHColumnCard>
                    <VColumnCard>
                      {(result.setup_time / 1000).toFixed(3)} s (
                      {result.setup_time_perc.toFixed(2)}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Execution Time</VHColumnCard>
                    <VColumnCard>
                      {(result.execution_time / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>

                  <VRowCard>
                    <VHColumnCard>Inside Time</VHColumnCard>
                    <VColumnCard>
                      {(result.in_time / 1000).toFixed(3)} s (
                      {result.in_time_perc.toFixed(2)}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Outside Time</VHColumnCard>
                    <VColumnCard>
                      {(result.out_time / 1000).toFixed(3)} s (
                      {result.out_time_perc.toFixed(2)}
                      %)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Average Cycle Time</VHColumnCard>
                    <VColumnCard>
                      {(result.average_cycle_time / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Average Serve Time</VHColumnCard>
                    <VColumnCard>
                      {(result.average_serve_time / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Average Wait Time</VHColumnCard>
                    <VColumnCard>
                      {(result.average_wait_time / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>

                  <VRowCard>
                    <VHColumnCard>Passed Requests</VHColumnCard>
                    <VColumnCard>
                      {result.passed_requests} ({result.passed_perc.toFixed(2)}
                      %)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Failed Requests</VHColumnCard>
                    <VColumnCard>
                      {result.failed_requests} ({result.failed_perc.toFixed(2)}
                      %)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Unkown Requests</VHColumnCard>
                    <VColumnCard>
                      {result.unknown_requests} (
                      {result.unknown_perc.toFixed(2)}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Log Length</VHColumnCard>
                    <VColumnCard>{result.log_length} lines</VColumnCard>
                  </VRowCard>
                </VTableCard>
              </Column>
            </Row>
          </Table>
        </SectionItemCard>

        <SectionItemCard title='Time Stats' icon={BsClockFill}>
          <Pie
            data={{
              labels: ['Setup Time', 'Inside Time', 'Outside Time'],
              datasets: [
                {
                  data: [
                    result.setup_time_perc,
                    result.in_time_perc,
                    result.out_time_perc,
                  ],
                  backgroundColor: ['#ffc107', '#198754', '#dc3545'],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </SectionItemCard>

        <SectionItemCard title='Status Stats' icon={BsUiChecks}>
          <Pie
            data={{
              labels: ['Passed Requests', 'Failed Requests', 'Unkown Requests'],
              datasets: [
                {
                  data: [
                    result.passed_perc,
                    result.failed_perc,
                    result.unknown_perc,
                  ],
                  backgroundColor: ['#198754', '#dc3545', '#ffc107'],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </SectionItemCard>
      </DivisionCard>
    )
  );
};

export default AppiumSummary;
