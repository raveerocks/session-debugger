const axios = require('axios');
const { logger } = require('../../util/logger');
const { logs, modules } = require('../../config/constants');
const { write, mkdir, exists } = require('../../util/file');

const download = (auth, category, sessionId) => {
  mkdir(`${modules.data.logs.path}`);
  mkdir(`${modules.data.logs.path}/${category}`);
  mkdir(`${modules.data.logs.path}/${category}/${sessionId}`);

  fetchLog(
    logs.session_details,
    auth,
    category,
    sessionId,
    (sessionDetails) => {
      const buildId = sessionDetails.automation_session.build_hashed_id;
      downloadLog(logs.session_details, auth, category, sessionId, buildId);
      downloadLog(logs.session_log, auth, category, sessionId, buildId);
      downloadLog(logs.console_log, auth, category, sessionId, buildId);
      downloadLog(logs.selenium_log, auth, category, sessionId, buildId);
      downloadLog(logs.appium_log, auth, category, sessionId, buildId);
      downloadLog(logs.network_log, auth, category, sessionId, buildId);
      downloadLog(logs.device_log, auth, category, sessionId, buildId);
    }
  );
};

const downloadLog = (log, auth, category, sessionId, buildId) => {
  const logFile = `${modules.data.logs.path}/${category}/${sessionId}/${log.logFile}`;
  if (!exists(logFile)) {
    logger.debug(`Started downloading ${log.name}.`);
    fetchLog(
      log,
      auth,
      category,
      sessionId,
      (content) => {
        write(logFile, content, log.preProcess);
        logger.debug(`Completed downloading ${log.name}.`);
      },
      buildId
    );
  } else {
    logger.warn(`Skipping ${log.name} download, it's already avaialable`);
  }
};

const fetchLog = (log, auth, category, sessionId, callback, buildId) => {
  const endPoint = !buildId
    ? `https://api.browserstack.com/${category}/sessions/${sessionId}${log.endPoint}`
    : `https://api.browserstack.com/${category}/builds/${buildId}/sessions/${sessionId}${log.endPoint}`;

  console.log(endPoint);
  axios
    .get(endPoint, {
      auth: {
        username: auth.user,
        password: auth.key,
      },
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((err) => {
      if (err.response && err.response.status && err.response.status == 404) {
        logger.warn(`${log.name} is not available for this session.`);
      } else {
        logger.error(`${log.name} failed with error ${err.toString()}`);
      }
    });
};

module.exports = { download };
