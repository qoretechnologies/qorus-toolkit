await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});
await Qorus.QorusAuthenticator.setEndpointVersion(6, 'rippy');
// => 6
