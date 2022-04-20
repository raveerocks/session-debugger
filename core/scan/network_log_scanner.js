const { read } = require('../../util/file');
const { convertUTCToEpoch } = require('../../util/time');

const scanNetworkLog = (logFile) => {
  const networkLog = JSON.parse(read(logFile, 'utf-8'));

  var intervals = [];
  const entries = networkLog.log.entries;
  const firstExchange = entries[0];
  var intervalId = 0;
  const startTime = convertUTCToEpoch(firstExchange.startedDateTime);

  intervals.push({
    id: ++intervalId,
    start_time: startTime,
    end_time: startTime + firstExchange.time,
    from: 1,
    to: 1,
  });

  entries.forEach((entry, index) => {
    if (index == 0) {
      return;
    }
    const startTime = convertUTCToEpoch(entry.startedDateTime);
    const endTime = startTime + entry.time;
    var lastInterval = intervals.pop();
    if (lastInterval.end_time < startTime) {
      intervals.push(lastInterval);
      intervals.push({
        id: ++intervalId,
        start_time: startTime,
        end_time: endTime,
        from: index + 1,
        to: index + 1,
      });
    } else if (lastInterval.endTime < endTime) {
      lastInterval = {
        ...lastInterval,
        end_time: endTime,
        to: index + 1,
      };
      intervals.push(lastInterval);
    } else {
      intervals.push({
        ...lastInterval,
        to: index + 1,
      });
    }
  });

  var totalActivityTime = 0;
  intervals.forEach((interval) => {
    totalActivityTime += interval.end_time - interval.start_time;
  });

  var totalBlockedTime = 0;
  var totalSendTime = 0;
  var totalSSLTime = 0;
  var totalDNSTime = 0;
  var totalWaitTime = 0;
  var totalReceiveTime = 0;
  var totalConnectTime = 0;
  var totalUnaccountedTime = 0;
  var totalRequestTime = 0;
  var exchanges = [];

  networkLog.log.entries.forEach((entry, index) => {
    const startTime = convertUTCToEpoch(entry.startedDateTime);
    const blockedTime = entry.timings.blocked >= 0 ? entry.timings.blocked : 0;
    const sendTime = entry.timings.send >= 0 ? entry.timings.send : 0;
    const sslTime = entry.timings.ssl >= 0 ? entry.timings.ssl : 0;
    const dnsTime = entry.timings.dns >= 0 ? entry.timings.dns : 0;
    const waitTime = entry.timings.wait >= 0 ? entry.timings.wait : 0;
    const receiveTime = entry.timings.receive >= 0 ? entry.timings.receive : 0;
    const connectTime = entry.timings.connect >= 0 ? entry.timings.connect : 0;
    const requestTime = entry.time;
    const unAccountedTime = Math.max(
      0,
      requestTime -
        (blockedTime +
          sendTime +
          sslTime +
          dnsTime +
          waitTime +
          receiveTime +
          connectTime)
    );
    entry.timings.unaccounted = unAccountedTime;

    totalBlockedTime += blockedTime;
    totalSendTime += sendTime;
    totalSSLTime += sslTime;
    totalDNSTime += dnsTime;
    totalWaitTime += waitTime;
    totalReceiveTime += receiveTime;
    totalConnectTime += connectTime;
    totalUnaccountedTime += unAccountedTime;
    totalRequestTime += requestTime;

    exchanges.push({
      id: index + 1,
      ...entry,
      startedDateTime: startTime,
    });
  });

  const result = {
    summary: {
      version: networkLog.log.version,
      creator_name: networkLog.log.creator.name,
      creator_version: networkLog.log.creator.version,
      total: totalRequestTime,
      total_effective_time: totalActivityTime,
      blocked: totalBlockedTime,
      send: totalSendTime,
      ssl: totalSSLTime,
      dns: totalDNSTime,
      wait: totalWaitTime,
      receive: totalReceiveTime,
      connect: totalConnectTime,
      unaccounted: totalUnaccountedTime,
      blocked_perc: ((totalBlockedTime * 100) / totalRequestTime).toFixed(2),
      send_perc: ((totalSendTime * 100) / totalRequestTime).toFixed(2),
      ssl_perc: ((totalSSLTime * 100) / totalRequestTime).toFixed(2),
      dns_perc: ((totalDNSTime * 100) / totalRequestTime).toFixed(2),
      wait_perc: ((totalWaitTime * 100) / totalRequestTime).toFixed(2),
      receive_perc: ((totalReceiveTime * 100) / totalRequestTime).toFixed(2),
      connect_perc: ((totalConnectTime * 100) / totalRequestTime).toFixed(2),
      unaccounted_perc: (
        (totalUnaccountedTime * 100) /
        totalRequestTime
      ).toFixed(2),
    },
    intervals: intervals,
    exchanges: exchanges,
  };

  return result;
};

module.exports = { scanNetworkLog };
