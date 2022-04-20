const { read } = require('../../util/file');

const scanConsoleLog = (logFile) => {
  const sessionLog = read(logFile, 'utf-8');

  if (sessionLog.indexOf('No messages were logged in this Session.') != -1) {
    return {};
  }

  const logLines = sessionLog.split('\n');
  const result = [];
  var id = 0;
  logLines.forEach((logLine, index) => {
    const line = logLine.trim();

    if (line) {
      const splittedLine = line.split(':');

      if (isNaN(splittedLine[0])) {
        return;
      }
      result.push({
        id: ++id,
        created_at: splittedLine[0],
        type: splittedLine[1],
        line_number: index + 1,
        message: logLine.substring(
          splittedLine[0].length + splittedLine[1].length
        ),
      });
    }
  });
  return result;
};

module.exports = { scanConsoleLog };
