const { stat } = require('../utils/fs');
const { separator } = require('../contants/path');
const readFileContent = require('../utils/read-file');
const errorCode = require('../contants/error-code');
const logger = require('../utils/logger');

const PACKAGEJSONFILE = 'package.json';

module.exports = async function readPackageJson(projectPath) {
  const targetFile = projectPath + separator + PACKAGEJSONFILE;
  return stat(targetFile)
    .then(() =>
      readFileContent(targetFile).then((content) => {
        const config = JSON.parse(content);
        const keyValuePairsArr = Object.entries(config.scripts);

        return keyValuePairsArr.map((script, index) => {
          const [key, value] = script;
          return {
            name: key,
            value,
            id: `script-${index}`,
          };
        });
      })
    )
    .catch((err) => {
      // TODO: grapgql结合express的error handler
      // ENOENT
      if (errorCode[err.code]) {
        logger(err.message);
      }
    });
};
