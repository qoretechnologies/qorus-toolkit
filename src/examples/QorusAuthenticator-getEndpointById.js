Qorus.QorusAuthenticator.addEndpoint({
  endpointId: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Returns the endpoint if exists in the endpoints array
await Qorus.QorusAuthenticator.getEndpointById('rippy');
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}
