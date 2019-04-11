const notifier = require('node-notifier');

exports.notify = ({ title, message }) => {
  notifier.notify({
    title,
    message,
  });
};
