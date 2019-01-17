module.exports = function promiseSerial(promiseTasks) {
  return promiseTasks.reduce(
    (promiseChain, currentTask) =>
      promiseChain.then((chainResults) => currentTask.then((currentResult) => [...chainResults, currentResult])),
    Promise.resolve([])
  );
};
