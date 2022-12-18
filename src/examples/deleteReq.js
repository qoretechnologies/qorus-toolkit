// First we initialize an Endpoint and provider user and pass to authenticate the user along with it
Qorus.QorusAuthenticator.addEndpoint({
  endpointId: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Next we initialize a delete request against our defined Qorus server
const result = await Qorus.QorusRequest.deleteReq({
  path: '/api/latest/classes/1',
});
