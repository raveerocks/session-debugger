const { read } = require('../../util/file');
const { convertUTCToEpoch } = require('../../util/time');

const scanSessionDetails = (logFile) => {
  const automationSession = JSON.parse(
    read(logFile, 'utf-8')
  ).automation_session;
  const result = {
    ...automationSession,
    created_at: convertUTCToEpoch(automationSession.created_at),
  };
  return result;
};

module.exports = { scanSessionDetails };
