const express = require('express');
const { ports, modules } = require('../config/constants');
const cors = require('cors');
const {
  registerSessionDetailsEndPoints,
} = require('./services/session_details_service');
const {
  registerSessionLogEndPoints,
} = require('./services/session_log_service');
const {
  registerSeleniumLogsEndPoints,
} = require('./services/selenium_log_service');
const {
  registerNetworkLogsEndPoints,
} = require('./services/network_log_service');
const { logger } = require('../util/logger');
const { registerInfoEndPoints } = require('./services/info_service');
const { serveReports } = require('../core/serve/serve');
const {
  registerAppiumLogsEndPoints,
} = require('./services/appium_log_service');

logger.info('Started creating the backend');
const database = serveReports();
logger.info('Completed loading database.');

const app = express().use(cors());
registerInfoEndPoints(database, app);
registerSessionDetailsEndPoints(database, app);
registerSessionLogEndPoints(database, app);
registerSeleniumLogsEndPoints(database, app);
registerNetworkLogsEndPoints(database, app);
registerAppiumLogsEndPoints(database, app);
logger.info('Completed registering end points.');

app.listen(ports.back_end);
