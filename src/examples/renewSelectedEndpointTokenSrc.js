await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Renews auth-token for the selected endpoint
await Qorus.QorusAuthenticator.renewSelectedEndpointToken({ user: 'sandbox', pass: 'sandbox' });
// => "random token hash returned from the server"
