Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  endpointId: 'rippy',
  version: 'latest',
});
// Returns selected endpoint
await Qorus.QorusAuthenticator.getSelectedEndpoint();
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}
