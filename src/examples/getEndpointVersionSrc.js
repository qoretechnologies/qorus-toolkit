await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

Qorus.QorusAuthenticator.getEndpointVersion();
// => 'latest'
