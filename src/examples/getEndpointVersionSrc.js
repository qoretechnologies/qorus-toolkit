await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});

Qorus.QorusAuthenticator.getEndpointVersion();
// => 'latest'
