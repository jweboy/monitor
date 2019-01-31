module.exports = function setResponseHeader(req, res, next) {
  res.setHeader('Accept-Encoding', 'gzip');
  next();
};
