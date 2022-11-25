// First we initialize an Endpoint and provider user and pass to authenticate the user along with it
Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Next we initialize a put request against our defined Qorus server
const result = await Qorus.QorusRequest.put({
  path: '/api/latest/dataprovider/browse',
  data: { context: 'api' },
});
