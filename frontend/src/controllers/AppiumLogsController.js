import axios from 'axios';

const getAppiumLogsSummary = (category, session) => {
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/appium-logs/summary`,
    {}
  );
};

const getAppiumLogsExchanges = (category, session, from, to, offset) => {
  from = parseInt(from) + parseInt(offset);
  to = parseInt(to) + parseInt(offset);
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/appium-logs/exchanges/${from}/${to}`,
    {}
  );
};

export { getAppiumLogsSummary, getAppiumLogsExchanges };
