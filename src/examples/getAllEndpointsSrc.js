await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

Qorus.QorusAuthenticator.getAllEndpoints();
// => [{ "url":"https://sandbox.qoretechnologies.com","id":"rippy","version": "latest" }]
