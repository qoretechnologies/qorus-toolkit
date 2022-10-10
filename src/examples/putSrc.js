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

// Using put operation to fetch the available data providers with context api
const result = await Qorus.QorusRequest.put({
  endpointUrl: 'https://sandbox.qoretechnologies.com/api/latest/dataprovider/browse',
  headers: headers,
  params: { context: 'api' },
});
