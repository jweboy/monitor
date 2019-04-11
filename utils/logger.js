const chalk = require('chalk');
const dayjs = require('dayjs');

// const path = require('path');
// const fs = require('./fs');
// const errorCode = require('../contants/error-code');
// const contantsPath = require('../contants/path');
// const flag = require('../contants/flag');
// const { root } = require('../contants/path');

// function appendContentToFile(filePath, text) {
//   const tpl = `[${dayjs().format('HH:mm:ss')}] ${text}\n`;
//   return fs.appendFile(filePath, tpl);
// }

// function makeLogFile(filePath, text) {
//   return fs
//     .stat(filePath)
//     .then(() => {
//       if (text != null) {
//         appendContentToFile(filePath, text);
//       }
//     })
//     .catch((err) => {
//       const msg = errorCode[err.code];
//       if (msg) {
//         fs.open(filePath, flag.a).then(() => {
//           appendContentToFile(filePath, text);
//         });
//       }
//     });
// }

exports.log = function logger(...args) {
  const currentDate = dayjs().format('HH:mm:ss');

  /* eslint-disable */
  console.log(`${chalk.white.bgBlue.bold(`[Apollo Server ${currentDate}]`)}`, ...args);
  // const LOGPRXFIE = 'log';
  // const logFile = `${LOGPRXFIE}/${currentDate}.txt`;
  // const filePath = path.join(contantsPath.root, logFile);
  // const logDirPath = path.join(root, LOGPRXFIE);

  // fs.stat(logDirPath)
  //   .then(() => {
  //     makeLogFile(filePath, text);
  //   })
  //   .catch((err) => {
  //     // ENOENT
  //     if (errorCode[err.code]) {
  //       fs.mkdir(logDirPath);
  //       makeLogFile(filePath, text);
  //     }
  //   });
};
