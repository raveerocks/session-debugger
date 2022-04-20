import { BsClockFill, BsFillFileEarmarkTextFill } from 'react-icons/bs';
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

import { MdMemory } from 'react-icons/md';
import { Pie } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js';
import { getNetworkLogsSummary } from '../../controllers/NetworkLogsController';

const NetworkSummary = (props) => {
  const [result, setResult] = useState();

  useEffect(() => {
    getNetworkLogsSummary(props.category, props.session)
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
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
                    <VHColumnCard>Logging Proxy</VHColumnCard>
                    <VColumnCard>{result.creator_name}</VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Logging Proxy Version</VHColumnCard>
                    <VColumnCard>{result.creator_version}</VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Total Time</VHColumnCard>
                    <VColumnCard>
                      {(result.total / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Total Effective Time</VHColumnCard>
                    <VColumnCard>
                      {(result.total_effective_time / 1000).toFixed(3)} s
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Blocked</VHColumnCard>
                    <VColumnCard>
                      {(result.blocked / 1000).toFixed(3)} s (
                      {result.blocked_perc}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Send</VHColumnCard>
                    <VColumnCard>
                      {(result.send / 1000).toFixed(3)} s ({result.send_perc}
                      %)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>SSL</VHColumnCard>
                    <VColumnCard>
                      {(result.ssl / 1000).toFixed(3)} s ({result.ssl_perc}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>DNS</VHColumnCard>
                    <VColumnCard>
                      {(result.dns / 1000).toFixed(3)} s ({result.dns_perc}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Wait</VHColumnCard>
                    <VColumnCard>
                      {(result.wait / 1000).toFixed(3)} s ({result.wait_perc}
                      %)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Receive</VHColumnCard>
                    <VColumnCard>
                      {(result.receive / 1000).toFixed(3)} s (
                      {result.receive_perc}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Connect</VHColumnCard>
                    <VColumnCard>
                      {(result.connect / 1000).toFixed(3)} s (
                      {result.connect_perc}%)
                    </VColumnCard>
                  </VRowCard>
                  <VRowCard>
                    <VHColumnCard>Unaccounted</VHColumnCard>
                    <VColumnCard>
                      {(result.unaccounted / 1000).toFixed(3)} s (
                      {result.unaccounted_perc}%)
                    </VColumnCard>
                  </VRowCard>
                </VTableCard>
              </Column>
            </Row>
          </Table>
        </SectionItemCard>
        <SectionItemCard title='Time Stats' icon={BsClockFill}>
          <Pie
            data={{
              labels: [
                'Blocked',
                'Send',
                'SSL',
                'DNS',
                'Wait',
                'Receive',
                'Connect',
              ],
              datasets: [
                {
                  data: [
                    result.blocked_perc,
                    result.send_perc,
                    result.ssl_perc,
                    result.dns_perc,
                    result.wait_perc,
                    result.receive_perc,
                    result.connect_perc,
                  ],
                  backgroundColor: [
                    '#b71c1c',
                    '#880e4f',
                    '#4a148c',
                    '#006064',
                    '#f9a825',
                    '#bf360c',
                    '#3e2723',
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </SectionItemCard>
        <SectionItemCard title='Memory Stats' icon={MdMemory}></SectionItemCard>
      </DivisionCard>
    )
  );
};

export default NetworkSummary;
