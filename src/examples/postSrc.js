// First we initialize an Endpoint
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Then we define the data object for the post request
const data = { user: 'sandbox', pass: 'sandbox' };

// Next we initialize a post request against our defined Qorus server
const result = await Qorus.QorusRequest.post({
  path: '/api/latest/public/login',
  data: data,
});
