const { modules } = require('../../config/constants');
const { countDir, getDir, read } = require('../../util/file');
const { logger } = require('../../util/logger');

const serveReports = () => {
  var reports = {};
  const baseReportPath = modules.data.reports.path;
  const automateReportPath = `${baseReportPath}/automate`;
  const appAutomateReportPath = `${baseReportPath}/app-automate`;

  logger.info(`${baseReportPath} is detected as report path`);
  logger.info(`${countDir(automateReportPath)} automate sessions found.`);

  reports[`automate`] = [];
  getDir(automateReportPath).forEach((session) => {
    reports[`automate`][session] = {};
    getDir(`${automateReportPath}/${session}`).forEach((log) => {
      reports[`automate`][session][log] = JSON.parse(
        read(`${automateReportPath}/${session}/${log}`, 'utf-8')
      );
    });
  });

  logger.info(
    `${countDir(appAutomateReportPath)} app-automate sessions found.`
  );
  reports[`app-automate`] = [];
  getDir(appAutomateReportPath).forEach((session) => {
    reports[`app-automate`][session] = {};
    getDir(`${appAutomateReportPath}/${session}`).forEach((log) => {
      reports[`app-automate`][session][log] = JSON.parse(
        read(`${appAutomateReportPath}/${session}/${log}`, 'utf-8')
      );
    });
  });

  return reports;
};

module.exports = { serveReports };
