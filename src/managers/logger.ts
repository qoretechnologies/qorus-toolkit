import { Roarr as logger } from 'roarr';
import { detect } from 'detect-browser';
const browser = detect();

if (browser) {
  logger.prototype.write = (message) => {
    console.log(JSON.parse(message));
  };
}
export default logger;
