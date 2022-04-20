import { useEffect, useState } from 'react';

import AppiumSummary from '../appium-logs/AppiumSummary';
import NetworkSummary from '../network-logs/NetworkSummary';
import SeleniumSummary from '../selenium-logs/SeleniumSummary';
import SessionDetailsTable from '../session-details/SessionDetailsTable';
import SessionLogOverViewList from '../session-logs/SessionLogOverViewList';
import SessionSummary from '../session-logs/SessionSummary';
import { getSessionInfo } from '../../controllers/InfoController';

const { SectionCard } = require('./Cards');

const Results = (props) => {
  const [result, setResult] = useState();

  useEffect(() => {
    getSessionInfo(props.category, props.session)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.category, props.session]);

  return (
    result &&
    result.session && (
      <div>
        {result.session_details && (
          <SectionCard header='Session Details'>
            <SessionDetailsTable
              category={props.category}
              session={props.session}
            />
          </SectionCard>
        )}

        {result.session_log && (
          <SectionCard header='Raw Log Summary'>
            <SessionSummary category={props.category} session={props.session} />
          </SectionCard>
        )}
        {result.selenium_log && (
          <SectionCard header='Selenium Log Summary'>
            <SeleniumSummary
              category={props.category}
              session={props.session}
            />
          </SectionCard>
        )}

        {result.appium_log && (
          <SectionCard header='Appium Log Summary'>
            <AppiumSummary category={props.category} session={props.session} />
          </SectionCard>
        )}

        {result.network_log && (
          <SectionCard header='Network Log Summary'>
            <NetworkSummary category={props.category} session={props.session} />
          </SectionCard>
        )}
        {
          <SectionCard header='Raw Log Details'>
            <SessionLogOverViewList
              category={props.category}
              session={props.session}
            />
          </SectionCard>
        }
      </div>
    )
  );
};

export default Results;
