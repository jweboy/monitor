const fs = require('fs');
const util = require('util');

const fsPromise = fs;

fsPromise.stat = util.promisify(fs.stat);
fsPromise.readdir = util.promisify(fs.readdir);
fsPromise.readFile = util.promisify(fs.readFile);
fsPromise.open = util.promisify(fs.open);
fsPromise.appendFile = util.promisify(fs.appendFile);

module.exports = fsPromise;
