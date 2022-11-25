// First we initialize an Endpoint
Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Then we define the data object for the post request
const data = { user: 'sandbox', pass: 'sandbox' };

// Next we initialize a post request against our defined Qorus server
const result = await Qorus.QorusRequest.post({
  path: '/api/latest/public/login',
  data: data,
});
