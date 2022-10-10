await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

await Qorus.QorusAuthenticator.setEndpointUrl('https://www.google.com', 'rippy');
// => 'https://www.google.com'
