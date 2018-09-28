var time = require('time')(Date),
  log = require('log-to-file');

var d = new Date();
d.setTimezone('IST', true);
d.getTimezone();

var logfunc = (message, filename, isError, error) => {
  if (isError) {
    log(
      `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} :${d.getHours()} :${d.getMinutes()} :${d.getSeconds()}\n ${error}`,
      `./server/logs/` + filename
    );
  } else {
    log(
      message +
        ` IST -> ${d.getFullYear()}/${d.getMonth() +
          1}/${d.getDate()} :${d.getHours()} :${d.getMinutes()} :${d.getSeconds()}`,
      `./server/logs/` + filename
    );
  }
};

module.exports = logfunc;
