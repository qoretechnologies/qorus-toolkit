Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

await Qorus.QorusAuthenticator.setEndpointUrl('https://www.google.com', 'rippy');
// => 'https://www.google.com'
