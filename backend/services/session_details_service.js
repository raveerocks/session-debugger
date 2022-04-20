const { logs } = require('../../config/constants');

const registerSessionDetailsEndPoints = (database, app) => {
  const endPont = logs.session_details.reportEndPoint;
  const file = logs.session_details.reportFile;

  app.get(`/automate/session/:sessionId/${endPont}`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]);
  });

  app.get(`/app-automate/session/:sessionId/${endPont}`, (req, res) => {
    res.json(database['app-automate'][req.params.sessionId][file]);
  });
};

module.exports = { registerSessionDetailsEndPoints };
