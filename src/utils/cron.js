cron = require("node-cron");

const functions = [];

/** Schedule a function to be run every N seconds as a cron task **/
function scheduleCron(func) {
  functions.push(func);
}

function activateCron(seconds = 10) {
  func = functions.pop();

  if (!func) {
    return;
  }

  cron.schedule(`${seconds} * * * * *`, () => {
    func();
  });

  if (functions.length > 0) {
    return activateCron();
  }
}

module.exports = { scheduleCron, activateCron };
