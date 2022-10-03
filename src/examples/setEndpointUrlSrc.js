await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});

await Qorus.QorusAuthenticator.setEndpointUrl('https://www.google.com', 'rippy');
// => 'https://www.google.com'
