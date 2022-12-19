await Qorus.QorusAuthenticator.initEndpoint({
  endpointId: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

Qorus.QorusAuthenticator.getAllEndpoints();
// => [{ "url":"https://sandbox.qoretechnologies.com","id":"rippy","version": "latest" }]
