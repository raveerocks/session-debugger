const convertUTCToEpoch = (time) => {
  return Date.parse(time);
};
module.exports = { convertUTCToEpoch };
