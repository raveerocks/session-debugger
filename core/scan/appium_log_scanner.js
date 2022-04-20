const { read } = require('../../util/file');
const { convertUTCToEpoch } = require('../../util/time');

const scanAppiumLog = (logFile) => {
  const appiumLogLine = [
    {
      name: 'start_session',
      identifier: 'newSessionRequested',
    },
    {
      name: 'dialect',
      identifier: '[BaseDriver] Creating session with',
    },
    {
      name: 'start_driver',
      identifier: 'newSessionStarted',
    },
    {
      name: 'request',
      identifier: '[HTTP] -->',
    },
    {
      name: 'response',
      identifier: '[HTTP] <--',
    },
  ];

  const logLines = read(logFile, 'utf-8').split('\n');

  var sessionStartedAt = null;
  var driverStartedAt = null;
  var sessionCompletedAt = null;
  var sessionDuration = null;
  var dialect = 'Unkown';
  var totalInTime = 0;
  var totalOutTime = 0;
  var statusUnknown = 0;
  var statusPassed = 0;
  var statusFailed = 0;

  const exchanges = [];
  var currentExchange = {};
  var exchangeId = 0;
  var prevousCreated = null;

  logLines.forEach((logLine, index) => {
    const line = logLine.trim();

    if (line) {
      const splittedLine = line.split(' ');
      const createdAtUTC = convertUTCToEpoch(
        splittedLine[0] + ' ' + splittedLine[1] + ' UTC'
      );

      var type;
      appiumLogLine.forEach((lineType) => {
        if (line.includes(lineType.identifier)) {
          type = lineType;
        }
      });

      if (!type) {
        type = {
          name: 'unkown',
          identifier: 'unkown',
        };
      }

      switch (type.name) {
        case appiumLogLine[0].name:
          sessionStartedAt = createdAtUTC;
          break;
        case appiumLogLine[1].name:
          dialect = line
            .split('[BaseDriver] Creating session with')[1]
            .split(' ')[1];
          break;
        case appiumLogLine[2].name:
          driverStartedAt = createdAtUTC;
          break;

        case appiumLogLine[3].name:
          if (line.includes('/wd/hub/session/')) {
            const data = line.split('--> ')[1].split(' ');
            var params = JSON.parse(logLines[index + 1].split('[HTTP]')[1]);
            currentExchange = {
              id: ++exchangeId,
              request: {
                created_at: createdAtUTC,
                line_number: index + 1,
                http_type: data[0],
                action: data[1],
                params: params,
                out_time:
                  createdAtUTC -
                  (prevousCreated ? prevousCreated : createdAtUTC),
              },
            };
            totalOutTime += currentExchange.request.out_time;
          } else if (line.includes('POST /wd/hub/session')) {
            currentExchange = {
              id: ++exchangeId,
              request: {
                created_at: createdAtUTC,
                line_number: index + 1,
                http_type: 'POST',
                action: '/wd/hub/session',
                params: {},
                out_time:
                  createdAtUTC -
                  (prevousCreated ? prevousCreated : createdAtUTC),
              },
            };
            totalOutTime += currentExchange.request.out_time;
          }
          break;
        case appiumLogLine[4].name:
          const data = line.split('[HTTP] <--')[1].split(' ');
          const status = data[3];
          const timing = data[4];
          const size = data[7];
          params = logLines[index - 1].split('result:')[1];

          currentExchange = {
            ...currentExchange,
            response: {
              created_at: createdAtUTC,
              line_number: index + 1,
              status: status,
              timing: timing,
              size: size,
              params: params,
              in_time:
                createdAtUTC - currentExchange.request
                  ? currentExchange.request.created_at
                  : 0,
            },
          };

          prevousCreated = createdAtUTC;
          totalInTime += currentExchange.response.in_time;
          if (currentExchange.response.status == null) {
            ++statusUnknown;
          } else if (currentExchange.response.status == '200') {
            ++statusPassed;
          } else {
            ++statusFailed;
          }
          exchanges.push(currentExchange);

          break;
      }
      sessionCompletedAt = createdAtUTC;
      sessionDuration = sessionCompletedAt - sessionStartedAt;
    }
  });

  const driverInitTime = driverStartedAt - sessionStartedAt;
  const executionTime = totalInTime + totalOutTime;
  const setupTime = sessionDuration - executionTime;

  const result = {
    summary: {
      total_requests: exchanges.length,
      dialect: dialect,
      session_started_at: sessionStartedAt,
      session_completed_at: sessionCompletedAt,
      driver_started_at: driverStartedAt,
      driver_init_time: driverInitTime,
      seesion_duration: sessionDuration,
      setup_time: setupTime,
      execution_time: executionTime,
      in_time: totalInTime,
      out_time: totalOutTime,
      passed_requests: statusPassed,
      failed_requests: statusFailed,
      unknown_requests: statusUnknown,
      log_length: logLines.length,
      setup_time_perc: (setupTime * 100) / sessionDuration,
      in_time_perc: (totalInTime * 100) / sessionDuration,
      out_time_perc: (totalOutTime * 100) / sessionDuration,
      average_cycle_time: executionTime / exchanges.length,
      average_serve_time: totalInTime / exchanges.length,
      average_wait_time: totalOutTime / exchanges.length,
      passed_perc: (statusPassed * 100) / exchanges.length,
      failed_perc: (statusFailed * 100) / exchanges.length,
      unknown_perc: (statusUnknown * 100) / exchanges.length,
    },
    exchanges: exchanges,
  };

  return result;
};

module.exports = { scanAppiumLog };
