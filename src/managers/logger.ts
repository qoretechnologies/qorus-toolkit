const logger = () => {
  const error = (message: string) => {
    console.error(message);
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
