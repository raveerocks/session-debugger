const { read } = require('../../util/file');
const { convertUTCToEpoch } = require('../../util/time');

const scanSessionLog = (logFile) => {
  const sessionLogLine = {
    request: {
      identifier: 'REQUEST',
    },
    start: {
      identifier: 'START_SESSION',
    },
    debug: {
      identifier: 'DEBUG',
    },
    response: {
      identifier: 'RESPONSE',
    },
  };

  const logLines = read(logFile, 'utf-8').split('\n');

  var sessionStartedAt = null;
  var sessionCompletedAt = null;
  var sessionDuration = null;

  const exchanges = [];
  var currentExchange = {};
  var exchangeId = 0;
  var prevousCreated = null;
  var totalInTime = 0;
  var totalOutTime = 0;
  var statusUnknown = 0;
  var statusPassed = 0;
  var statusFailed = 0;

  logLines.forEach((logLine, index) => {
    const line = logLine.trim();
    if (line) {
      const splittedLine = line.split(' ');
      const lineNumber = index + 1;
      const createdAt = convertUTCToEpoch(
        splittedLine[0] + ' ' + splittedLine[1] + ' UTC'
      );
      const type = splittedLine[2];
      const paramIndex = line.indexOf('{');
      var params = {};
      if (paramIndex != -1) {
        params = JSON.parse(line.substring(paramIndex));
      }

      sessionStartedAt = sessionStartedAt ? sessionStartedAt : createdAt;
      sessionCompletedAt = createdAt;
      sessionDuration = sessionCompletedAt - sessionStartedAt;

      switch (type) {
        case sessionLogLine.request.identifier:
          const currentRequest = {
            created_at: createdAt,
            line_number: lineNumber,
            out_time: createdAt - (prevousCreated ? prevousCreated : createdAt),
            http_type: splittedLine[5],
            action: splittedLine[6],
            params: params,
          };
          currentExchange = {
            ...currentExchange,
            request: currentRequest,
          };
          totalOutTime += currentExchange.request.out_time;
          break;
        case sessionLogLine.start.identifier:
          const startResponse = {
            created_at: createdAt,
            line_number: lineNumber,
            in_time: createdAt - currentExchange.request.created_at,
            params: params,
          };
          currentExchange = {
            id: ++exchangeId,
            ...currentExchange,
            response: startResponse,
          };
          totalInTime += currentExchange.response.in_time;
          var status = currentExchange.response.params.status;
          if (typeof status == 'undefined') {
            ++statusUnknown;
          } else if (status == 0) {
            ++statusPassed;
          } else {
            ++statusFailed;
          }
          exchanges.push(currentExchange);
          currentExchange = {};
          break;
        case sessionLogLine.debug.identifier:
          const currentDebug = {
            created_at: createdAt,
            line_number: lineNumber,
            url: splittedLine[3],
          };
          currentExchange = {
            ...currentExchange,
            debug: currentDebug,
          };
          break;
        case sessionLogLine.response.identifier:
          prevousCreated = createdAt;
          const currentResponse = {
            created_at: createdAt,
            line_number: lineNumber,
            in_time: createdAt - currentExchange.request.created_at,
            params: params,
          };
          currentExchange = {
            id: ++exchangeId,
            ...currentExchange,
            response: currentResponse,
          };
          totalInTime += currentExchange.response.in_time;
          status = currentExchange.response.params.status;
          if (typeof status == 'undefined') {
            ++statusUnknown;
          } else if (status == 0) {
            ++statusPassed;
          } else {
            ++statusFailed;
          }
          exchanges.push(currentExchange);
          currentExchange = {};
      }
    }
  });

  const executionTime = totalInTime + totalOutTime;
  const setupTime = sessionDuration - executionTime;

  const result = {
    summary: {
      total_requests: exchanges.length,
      session_started_at: sessionStartedAt,
      session_completed_at: sessionCompletedAt,
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

module.exports = { scanSessionLog };
