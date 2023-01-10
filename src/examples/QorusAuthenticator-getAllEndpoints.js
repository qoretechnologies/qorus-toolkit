// Initializes a new endpoint and returns it
const endpoint = Qorus.QorusAuthenticator.addEndpoint({
  endpointId: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

Qorus.QorusAuthenticator.getAllEndpoints();
// => [{ "url":"https://sandbox.qoretechnologies.com","id":"rippy","version": "latest" }]
