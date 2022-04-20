const { logs } = require('../../config/constants');

const registerInfoEndPoints = (database, app) => {
  const endPont = 'info';

  app.get(`/automate/session/:sessionId/${endPont}`, (req, res) => {
    const sessionData = database['automate'][req.params.sessionId];
    const session = !!sessionData;
    const sessionDetails =
      session && !!sessionData[logs.session_details.reportFile];
    const sessionLog = session && !!sessionData[logs.session_log.reportFile];
    const seleniumLog = session && !!sessionData[logs.selenium_log.reportFile];
    const appiumLog = session && !!sessionData[logs.appium_log.reportFile];
    const networkLog = session && !!sessionData[logs.network_log.reportFile];
    const deviceLog = session && !!sessionData[logs.device_log.reportFile];
    const resposne = {
      session: session,
      session_details: sessionDetails,
      session_log: sessionLog,
      selenium_log: seleniumLog,
      appium_log: appiumLog,
      network_log: networkLog,
      device_log: deviceLog,
    };
    res.json(resposne);
  });

  app.get(`/app-automate/session/:sessionId/${endPont}`, (req, res) => {
    const sessionData = database['app-automate'][req.params.sessionId];
    const session = !!sessionData;
    const sessionDetails =
      session && !!sessionData[logs.session_details.reportFile];
    const sessionLog = session && !!sessionData[logs.session_log.reportFile];
    const seleniumLog = session && !!sessionData[logs.selenium_log.reportFile];
    const appiumLog = session && !!sessionData[logs.appium_log.reportFile];
    const networkLog = session && !!sessionData[logs.network_log.reportFile];
    const deviceLog = session && !!sessionData[logs.device_log.reportFile];
    const resposne = {
      session: session,
      session_details: sessionDetails,
      session_log: sessionLog,
      selenium_log: seleniumLog,
      appium_log: appiumLog,
      network_log: networkLog,
      device_log: deviceLog,
    };
    res.json(resposne);
  });
};

module.exports = { registerInfoEndPoints };
