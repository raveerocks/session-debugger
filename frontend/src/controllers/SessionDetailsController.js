import axios from 'axios';

const getSessionDetails = (category, session) => {
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/session-details`,
    {}
  );
};

export { getSessionDetails };
