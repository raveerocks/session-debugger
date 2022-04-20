const { logs } = require('../../config/constants');

const registerAppiumLogsEndPoints = (database, app) => {
  const endPont = logs.appium_log.reportEndPoint;
  const file = logs.appium_log.reportFile;

  app.get(`/automate/session/:sessionId/${endPont}`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]);
  });

  app.get(`/automate/session/:sessionId/${endPont}/summary`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]['summary']);
  });

  app.get(`/automate/session/:sessionId/${endPont}/exchanges`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]['exchanges']);
  });

  app.get(
    `/automate/session/:sessionId/${endPont}/exchanges/:from/:to`,
    (req, res) => {
      res.json(
        database['automate'][req.params.sessionId][file]['exchanges'].filter(
          (exchange) =>
            exchange.request.created_at >= req.params.from &&
            exchange.request.created_at <= req.params.to
        )
      );
    }
  );

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

  app.get(
    `/app-automate/session/:sessionId/${endPont}/exchanges/:from/:to`,
    (req, res) => {
      res.json(
        database['app-automate'][req.params.sessionId][file][
          'exchanges'
        ].filter(
          (exchange) =>
            exchange.request.created_at >= req.params.from &&
            exchange.request.created_at <= req.params.to
        )
      );
    }
  );
};

module.exports = {
  registerAppiumLogsEndPoints,
};
