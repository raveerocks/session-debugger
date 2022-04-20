const { dataCenters, modules, logs } = require('../../config/constants');
const { logger } = require('../../util/logger');
const { exists, write, mkdir } = require('../../util/file');

const scan = (sessionId, date, dataCenter, catergory) => {
  if (!exists(`${modules.data.logs.path}/${catergory}/${sessionId}`)) {
    console.error('Logs are not found for this session');
    return;
  }
  const timeZone = dataCenters[dataCenter].time_zone;
  startScan(logs.session_details, sessionId, catergory);
  startScan(logs.session_log, sessionId, catergory);
  startScan(logs.console_log, sessionId, catergory);
  startScan(logs.selenium_log, sessionId, catergory, date, timeZone);
  startScan(logs.appium_log, sessionId, catergory);
  startScan(logs.network_log, sessionId, catergory);
};

const startScan = (log, sessionId, catergory, date, timeZone) => {
  const logFile = `${modules.data.logs.path}/${catergory}/${sessionId}/${log.logFile}`;

  if (!exists(logFile)) {
    logger.warn(`${log.name} not found for this session.`);
    return;
  }
  logger.debug(`Started scanning ${log.name}`);
  const scanReport = log.scanner(logFile, date, timeZone);
  logger.debug(`Completed scanning ${log.name}`);
  const reportFile = `${modules.data.reports.path}/${catergory}/${sessionId}/${log.reportFile}`;
  if (!exists(`${modules.data.reports.path}/${catergory}/${sessionId}`)) {
    mkdir(`${modules.data.reports.path}/${catergory}/${sessionId}`);
  }
  write(reportFile, scanReport, JSON.stringify);
  logger.debug(`${log.name} scan reports are generated`);
};

module.exports = { scan };
