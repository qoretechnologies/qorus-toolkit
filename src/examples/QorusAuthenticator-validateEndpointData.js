// Initializes a new endpoint and returns it
// Optional user and pass parameters can be provided to initialize the endpoint and then authenticate the user
const endpoint = {
  endpointId: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
};

// Returns true if the no-auth is enabled, false otherwise
Qorus.QorusAuthenticator.validateEndpointData(endpoint, false);
// => true
