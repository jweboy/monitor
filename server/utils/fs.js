const fs = require('fs');
const util = require('util');

const fsPromise = fs;

fsPromise.stat = util.promisify(fs.stat);
fsPromise.readdir = util.promisify(fs.readdir);

module.exports = fsPromise;
