import { Roarr as logger } from 'roarr';
import { detect } from 'detect-browser';
import { addUncaughtListener, startUncaughtListener } from '../CatchUncaughtErrors';
const browser = detect();

if (browser) {
  logger.prototype.write = (message) => {
    console.log(JSON.parse(message));
  };
}

startUncaughtListener();
addUncaughtListener((error) => {
  logger.error(error);
});

export default logger;
