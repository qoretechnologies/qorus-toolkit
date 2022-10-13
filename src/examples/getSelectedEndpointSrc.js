await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Returns selected endpoint
await Qorus.QorusAuthenticator.getSelectedEndpoint();
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}
