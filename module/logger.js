const path = require('path');
const dayjs = require('dayjs');
const fs = require('../utils/fs');
const errorCode = require('../contants/error-code');
const contantsPath = require('../contants/path');
const flag = require('../contants/flag');

function mkLogFile(filePath) {
  return fs.open(filePath, flag.a);
}

function appendContentToFile(filePath, text) {
  const tpl = `[${dayjs().format('HH:mm:ss')}] ${text}\n`;
  return fs.appendFile(filePath, tpl);
}

module.exports = function logger(text) {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const logPrefix = 'log';
  const logFile = `${logPrefix}/${currentDate}.txt`;
  const filePath = path.join(contantsPath.root, logFile);

  fs.stat(filePath)
    .then(() => {
      if (text != null) {
        appendContentToFile(filePath, text);
      }
    })
    .catch((err) => {
      const msg = errorCode[err.code];
      if (msg) {
        mkLogFile(filePath).then(() => {
          appendContentToFile(filePath, text);
        });
      }
    });
};
