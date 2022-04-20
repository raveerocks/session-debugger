const { logs } = require('../../config/constants');

const registerSessionLogEndPoints = (database, app) => {
  const endPont = logs.session_log.reportEndPoint;
  const file = logs.session_log.reportFile;

  app.get(`/automate/session/:sessionId/${endPont}`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]);
  });

  app.get(`/automate/session/:sessionId/${endPont}/summary`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]['summary']);
  });

  app.get(`/automate/session/:sessionId/${endPont}/exchanges`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]['exchanges']);
  });

  app.get(`/app-automate/session/:sessionId/${endPont}`, (req, res) => {
    res.json(database['app-automate'][req.params.sessionId][file]);
  });

  app.get(`/app-automate/session/:sessionId/${endPont}/summary`, (req, res) => {
    res.json(database['app-automate'][req.params.sessionId][file]['summary']);
  });

  app.get(
    `/app-automate/session/:sessionId/${endPont}/exchanges`,
    (req, res) => {
      res.json(
        database['app-automate'][req.params.sessionId][file]['exchanges']
      );
    }
  );
};

module.exports = {
  registerSessionLogEndPoints,
};
