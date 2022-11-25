Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Changes selected endpoint and return true if selected
await Qorus.QorusAuthenticator.selectEndpoint('rippy');
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}
