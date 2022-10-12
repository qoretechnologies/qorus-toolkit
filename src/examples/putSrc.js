// First we initialize an Endpoint and provider user and pass to authenticate the user along with it
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
  user: 'sandbox',
  pass: 'sandbox',
});

// Next we initialize a put request against our defined Qorus server
const result = await Qorus.QorusRequest.put({
  path: '/api/latest/dataprovider/browse',
  data: { context: 'api' },
});
