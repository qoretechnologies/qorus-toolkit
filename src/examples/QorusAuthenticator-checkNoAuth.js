// Initializes a new endpoint and returns it
const endpoint = Qorus.QorusAuthenticator.addEndpoint({
  endpointId: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Returns true if the no-auth is enabled, false otherwise
Qorus.QorusAuthenticator.checkNoAuth(endpoint);
// => False
