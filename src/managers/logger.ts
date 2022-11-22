const logger = () => {
  const error = (message: any) => {
    console.error(message);
  };
  const log = (message: any) => {
    console.log(message);
  };
  return {
    error,
    log,
  };
};

export default logger();

export const errorTypes = {
  authenticationError: 'Authentication Error',
  generalAuthenticatorError: 'General Authenticator Error',
  invalidAuthenticationToken: 'Invalid Authentication Token',
};
