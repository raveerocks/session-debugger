import { BsFillFileBarGraphFill, BsFillLaptopFill } from 'react-icons/bs';
import {
  ColumnCard,
  DivisionCard,
  HColumnCard,
  RowCard,
  SectionItemCard,
  TableCard,
} from '../common/Cards';
import { useEffect, useState } from 'react';

import { getSessionDetails } from '../../controllers/SessionDetailsController';
import moment from 'moment';

const SessionDetailsTable = (props) => {
  const [result, setResult] = useState();
  useEffect(() => {
    getSessionDetails(props.category, props.session)
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
        <SectionItemCard title='Device Details' icon={BsFillLaptopFill}>
          <TableCard>
            {result.os && (
              <RowCard>
                <HColumnCard>OS</HColumnCard>
                <ColumnCard>{result.os}</ColumnCard>
              </RowCard>
            )}
            {result.os_version && (
              <RowCard>
                <HColumnCard>OS Version</HColumnCard>
                <ColumnCard>{result.os_version}</ColumnCard>
              </RowCard>
            )}
            {result.browser && (
              <RowCard>
                <HColumnCard>Browser</HColumnCard>
                <ColumnCard>{result.browser}</ColumnCard>
              </RowCard>
            )}
            {!result.app_details && result.browser_version && (
              <RowCard>
                <HColumnCard>Browser Version</HColumnCard>
                <ColumnCard>{result.browser_version}</ColumnCard>
              </RowCard>
            )}
            {result.device && (
              <RowCard>
                <HColumnCard>Device</HColumnCard>
                <ColumnCard>{result.device}</ColumnCard>
              </RowCard>
            )}
            {result.app_details && result.app_details.app_name && (
              <RowCard>
                <HColumnCard>App</HColumnCard>
                <ColumnCard>{result.app_details.app_name}</ColumnCard>
              </RowCard>
            )}

            {result.app_details && result.app_details.app_version && (
              <RowCard>
                <HColumnCard>App Version</HColumnCard>
                <ColumnCard>{result.app_details.app_version}</ColumnCard>
              </RowCard>
            )}
            {result.app_details && result.app_details.uploaded_at && (
              <RowCard>
                <HColumnCard>App Uploaded At</HColumnCard>
                <ColumnCard>
                  {moment(result.app_details.uploaded_at)
                    .utc()
                    .format('DD-MMM-YYYY hh:mm:ss')}
                </ColumnCard>
              </RowCard>
            )}
          </TableCard>
        </SectionItemCard>
        <SectionItemCard title='Build Details' icon={BsFillFileBarGraphFill}>
          <TableCard>
            {result.project_name && (
              <RowCard>
                <HColumnCard>Project</HColumnCard>
                <ColumnCard>{result.project_name}</ColumnCard>
              </RowCard>
            )}
            {result.build_name && (
              <RowCard>
                <HColumnCard>Build Name</HColumnCard>
                <ColumnCard>{result.build_name}</ColumnCard>
              </RowCard>
            )}
            {result.name && (
              <RowCard>
                <HColumnCard>Name</HColumnCard>
                <ColumnCard>{result.name}</ColumnCard>
              </RowCard>
            )}
            {result.status && (
              <RowCard>
                <HColumnCard>Status</HColumnCard>
                <ColumnCard>
                  {result.status === 'passed' ? 'Passed' : 'Failed'}
                </ColumnCard>
              </RowCard>
            )}
            {result.reason && (
              <RowCard>
                <HColumnCard>Reason</HColumnCard>
                <ColumnCard>
                  {result.reason.length > 10
                    ? `${result.reason.substring(0, 10)}...`
                    : result.reason}
                </ColumnCard>
              </RowCard>
            )}
            {result.created_at && (
              <RowCard>
                <HColumnCard>Created At</HColumnCard>
                <ColumnCard>
                  {moment(result.created_at)
                    .utc()
                    .format('DD-MMM-YYYY hh:mm:ss')}
                </ColumnCard>
              </RowCard>
            )}
            {result.created_at && result.duration && (
              <RowCard>
                <HColumnCard>Completed At</HColumnCard>
                <ColumnCard>
                  {moment(result.created_at)
                    .add(result.duration * 1000)
                    .utc()
                    .format('DD-MMM-YYYY hh:mm:ss')}
                </ColumnCard>
              </RowCard>
            )}
            {result.duration && (
              <RowCard>
                <HColumnCard>Duration</HColumnCard>
                <ColumnCard>{`${result.duration} s`}</ColumnCard>
              </RowCard>
            )}
          </TableCard>
        </SectionItemCard>
      </DivisionCard>
    )
  );
};
export default SessionDetailsTable;
