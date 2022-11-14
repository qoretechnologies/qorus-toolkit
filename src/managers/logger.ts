// import logger from 'tracer';

const logger = () => {
  const error = (message: string) => {
    console.log(message);
  };
  const log = (message: string) => {
    console.log(message);
  };
  return {
    error,
    log,
  };
};

export default logger();
