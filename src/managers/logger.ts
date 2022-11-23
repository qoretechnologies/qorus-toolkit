import { Roarr as logger } from 'roarr';
import { detect } from 'detect-browser';
import { addUncaughtListener, startUncaughtListener } from '../utils/catchUncaughtErrors';
import { ROARR } from 'roarr';

const browser = detect();

if (browser?.type !== 'node') {
  ROARR.write = (message) => {
    logger.info(JSON.stringify(message));
  };
}

startUncaughtListener();
addUncaughtListener((error) => {
  logger.error(error);
});

export default logger;
