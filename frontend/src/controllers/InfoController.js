import axios from 'axios';

const getSessionInfo = (category, session) => {
  return axios.get(
    `http://localhost:3000/${category}/session/${session}/info`,
    {}
  );
};

export { getSessionInfo };
