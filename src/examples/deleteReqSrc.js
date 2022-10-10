// Customizing default headers
let headers = { ...Qorus.QorusRequest.defaultHeaders, 'Qorus-Token': '' };

// Creating an endpoint
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Authenticating User
headers['Qorus-Token'] = await Qorus.QorusAuthenticator.login({ user: 'sandbox', pass: 'sandbox' });

// Using delete operation to delete a class
const result = await Qorus.QorusRequest.deleteReq({
  endpointUrl: 'https://sandbox.qoretechnologies.com/api/latest/classes/1',
  headers: headers,
});
