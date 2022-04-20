const { logs } = require('../../config/constants');

const registerNetworkLogsEndPoints = (database, app) => {
  const endPont = logs.network_log.reportEndPoint;
  const file = logs.network_log.reportFile;

  app.get(`/automate/session/:sessionId/${endPont}`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]);
  });

  app.get(`/automate/session/:sessionId/${endPont}/summary`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]['summary']);
  });

  app.get(`/automate/session/:sessionId/${endPont}/intervals`, (req, res) => {
    res.json(database['automate'][req.params.sessionId][file]['intervals']);
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
            exchange.startedDateTime >= req.params.from &&
            exchange.startedDateTime <= req.params.to
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
    `/app-automate/session/:sessionId/${endPont}/intervals`,
    (req, res) => {
      res.json(
        database['app-automate'][req.params.sessionId][file]['intervals']
      );
    }
  );

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
            exchange.startedDateTime >= req.params.from &&
            exchange.startedDateTime <= req.params.to
        )
      );
    }
  );
};

module.exports = { registerNetworkLogsEndPoints };
