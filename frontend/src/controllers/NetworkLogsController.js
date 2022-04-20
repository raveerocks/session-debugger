import axios from 'axios';

const getNetworkLogsSummary = (category, session) => {
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/network-logs/summary`,
    {}
  );
};

const getNetworkLogsExchanges = (category, session, from, to, offset) => {
  from = parseInt(from) + parseInt(offset);
  to = parseInt(to) + parseInt(offset);
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/network-logs/exchanges/${from}/${to}`,
    {}
  );
};

export { getNetworkLogsSummary, getNetworkLogsExchanges };
