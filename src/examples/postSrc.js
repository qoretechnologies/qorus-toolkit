// Creating an endpoint
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

const data = { user: 'sandbox', pass: 'sandbox' };

// Using post operation to authenticate the user using username and password
const result = await Qorus.QorusRequest.post({
  endpointUrl: 'https://sandbox.qoretechnologies.com/api/latest/public/login',
  headers: Qorus.QorusRequest.defaultHeaders,
  data: data,
});
