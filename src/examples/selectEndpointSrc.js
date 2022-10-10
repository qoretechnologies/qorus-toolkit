await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Changes selected endpoint and return true if selected
await Qorus.QorusAuthenticator.selectEndpoint('rippy');
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}
