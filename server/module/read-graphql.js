const readFileContent = require('../utils/read-file');
const { schema, separator } = require('../contants/path');
const { readdir } = require('../utils/fs');
const promiseSerial = require('../utils/promise-serial');

module.exports = function readSchemaFiles() {
  return readdir(schema).then(async (files) => {
    const suffixRegular = /\.graphql$/;
    const queueTask = [];

    /* eslint-disable */
    for (const fileName of files) {
      if(suffixRegular.test(fileName)) {
        const currentFilePath = schema + separator + fileName;
        const promiseTask = readFileContent(currentFilePath);
        queueTask.push(promiseTask);
      }
    }

    return promiseSerial(queueTask).then(data => data);
  });
};
