import axios from 'axios';

const getSeleniumLogsSummary = (category, session) => {
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/selenium-logs/summary`,
    {}
  );
};

const getSeleniumLogsExchanges = (category, session, from, to, offset) => {
  from = parseInt(from) + parseInt(offset);
  to = parseInt(to) + parseInt(offset);
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/selenium-logs/exchanges/${from}/${to}`,
    {}
  );
};

export { getSeleniumLogsSummary, getSeleniumLogsExchanges };
