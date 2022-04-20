const { scanAppiumLog } = require('../core/scan/appium_log_scanner');
const { scanConsoleLog } = require('../core/scan/console_log_scanner');
const { scanNetworkLog } = require('../core/scan/network_log_scanner');
const { scanSeleniumLog } = require('../core/scan/selenium_log_scanner');
const { scanSessionDetails } = require('../core/scan/session_details_scanner');
const { scanSessionLog } = require('../core/scan/session_log_scanner');

const dataCenters = {
  us_east_1: {},
  us_east_2: {},
  us_east_3: {},
  us_west_1: {},
  us_west_2: {},
  us_west_3: {},
  eu_west_1: { time_zone: '+02:00' },
  eu_central_1: {},
  ap_south_1: { time_zone: '+05:30' },
  ap_south_east_2: { time_zone: '+10:00' },
};

const modules = {
  back_end: {},
  cli: {},
  config: {},
  data: { logs: { path: 'data/logs' }, reports: { path: 'data/reports' } },
  front_end: {},
};

const ports = {
  back_end: 3000,
  front_end: 3001,
};

const logs = {
  session_details: {
    name: 'Session Details',
    endPoint: '.json',
    logFile: 'session_details.json',
    reportFile: 'session_details_report.json',
    scanner: scanSessionDetails,
    preProcess: JSON.stringify,
    reportEndPoint: 'session-details',
  },
  session_log: {
    name: 'Session Log',
    endPoint: '/logs',
    logFile: 'session_log.log',
    reportFile: 'session_log_report.json',
    scanner: scanSessionLog,
    reportEndPoint: 'session-logs',
  },
  console_log: {
    name: 'Console Log',
    endPoint: '/consolelogs',
    logFile: 'console_log.log',
    reportFile: 'console_report.json',
    scanner: scanConsoleLog,
    reportEndPoint: 'console-logs',
  },
  selenium_log: {
    name: 'Selenium Log',
    endPoint: '/seleniumlogs',
    logFile: 'selenium_log.log',
    reportFile: 'selenium_report.json',
    scanner: scanSeleniumLog,
    reportEndPoint: 'selenium-logs',
  },
  appium_log: {
    name: 'Appium Log',
    endPoint: '/appiumlogs',
    logFile: 'appium_log.log',
    reportFile: 'appium_report.json',
    scanner: scanAppiumLog,
    reportEndPoint: 'appium-logs',
  },
  network_log: {
    name: 'Network Log',
    endPoint: '/networklogs',
    logFile: 'network_log.json',
    preProcess: JSON.stringify,
    reportFile: 'network_report.json',
    scanner: scanNetworkLog,
    reportEndPoint: 'network-logs',
  },
  device_log: {
    name: 'Device Log',
    endPoint: '/devicelogs',
    logFile: 'device_log.log',
    reportFile: 'device_log_report.json',
    reportEndPoint: 'device-logs',
  },
};

module.exports = { dataCenters, modules, ports, logs };
