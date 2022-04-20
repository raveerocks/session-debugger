const { read } = require('../../util/file');
const { convertUTCToEpoch } = require('../../util/time');

const scanSeleniumLog = (logFile, date, timeZone) => {
  const seleniumLogLine = [
    {
      name: 'start_session',
      identifier: '/session: Executing POST on /session ',
    },
    {
      name: 'polling',
      identifier: 'Polling http://localhost',
    },
    {
      name: 'dialect',
      identifier: 'Detected dialect',
    },
    {
      name: 'start_driver',
      identifier: 'Started new session',
    },
    {
      name: 'request',
      identifier: 'Found handler',
    },
    {
      name: 'request_handler',
      identifier: 'Handler thread for session',
    },
    {
      name: 'upstream',
      identifier: 'To upstream',
    },
    {
      name: 'http_request',
      identifier: 'writeRequests',
    },
    {
      name: 'http_response',
      identifier: 'getInputStream0',
    },
    {
      name: 'downstream',
      identifier: 'To downstream',
    },
    {
      name: 'stop_session',
      identifier: 'Removing session',
    },
  ];

  const logLines = read(logFile, 'utf-8').split('\n');

  var sessionStartedAt = null;
  var driverStartedAt = null;
  var sessionCompletedAt = null;
  var sessionDuration = null;
  var pollCount = 0;
  var dialect = 'Unkown';
  var totalInTime = 0;
  var totalOutTime = 0;
  var statusUnknown = 0;
  var statusPassed = 0;
  var statusFailed = 0;

  var exchanges = [];
  var currentExchange = {};
  var exchangeId = 0;
  var prevousCreated = null;

  logLines.forEach((logLine, index) => {
    const line = logLine.trim();
    if (line) {
      const split = line.split(' ');
      const createdAtUTC = convertUTCToEpoch(`${date}T${split[0]}${timeZone}`);

      var type;

      seleniumLogLine.forEach((lineType) => {
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
        case seleniumLogLine[0].name:
          sessionStartedAt = createdAtUTC;
          break;
        case seleniumLogLine[1].name:
          pollCount++;
          break;
        case seleniumLogLine[2].name:
          dialect = line.split('Detected dialect:')[1].trim();
          break;
        case seleniumLogLine[3].name:
          driverStartedAt = createdAtUTC;
          break;
        case seleniumLogLine[4].name:
          currentExchange = {
            id: ++exchangeId,
            request: {
              created_at: createdAtUTC,
              line_number: index + 1,
              out_time:
                createdAtUTC - (prevousCreated ? prevousCreated : createdAtUTC),
            },
          };
          totalOutTime += currentExchange.request.out_time;
          break;
        case seleniumLogLine[6].name:
          currentExchange = {
            ...currentExchange,
            request: {
              ...currentExchange.request,
              params: JSON.parse(line.split('To upstream:')[1]),
            },
          };
          break;
        case seleniumLogLine[7].name:
          currentExchange = {
            ...currentExchange,
            request: {
              ...currentExchange.request,
              headers: JSON.parse(
                line
                  .split('pairs:')[1]
                  .replace(/}{/g, '","')
                  .replace(/: /g, '": "')
                  .replace(/{/g, '{"')
                  .replace(/}/g, '"}')
              ),
            },
          };
          break;
        case seleniumLogLine[8].name:
          currentExchange = {
            ...currentExchange,
            response: {
              headers: JSON.parse(
                line
                  .split('pairs:')[1]
                  .replace(/}{/g, '","')
                  .replace(/: /g, '": "')
                  .replace(/{/g, '{"')
                  .replace(/}/g, '"}')
              ),
            },
          };
          break;
        case seleniumLogLine[9].name:
          prevousCreated = createdAtUTC;
          currentExchange = {
            ...currentExchange,
            response: {
              ...currentExchange.response,
              created_at: createdAtUTC,
              line_number: index + 1,
              in_time: createdAtUTC - currentExchange.request.created_at,
              params: JSON.parse(line.split('To downstream:')[1]),
            },
          };
          totalInTime += currentExchange.response.in_time;
          if (typeof currentExchange.response.headers['null'] == 'undefined') {
            ++statusUnknown;
          } else if (
            currentExchange.response.headers['null'].includes('200 OK')
          ) {
            ++statusPassed;
          } else {
            ++statusFailed;
          }
          exchanges.push(currentExchange);
          currentExchange = {};
          break;
        case seleniumLogLine[10].name:
          currentExchange = {
            id: ++exchangeId,
            request: {
              created_at: createdAtUTC,
              line_number: index + 1,
              out_time:
                createdAtUTC - (prevousCreated ? prevousCreated : createdAtUTC),
            },
          };
          totalOutTime += currentExchange.request.out_time;
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
      polls: pollCount,
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

module.exports = { scanSeleniumLog };
