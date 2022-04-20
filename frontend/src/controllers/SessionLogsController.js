import axios from 'axios';

const getSessionLogsSummary = (category, session) => {
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/session-logs/summary`,
    {}
  );
};

const getSessionLogsExchanges = (category, session) => {
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/session-logs/exchanges`,
    {}
  );
};

export { getSessionLogsSummary, getSessionLogsExchanges };
