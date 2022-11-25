Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Renews auth-token for the selected endpoint
await Qorus.QorusAuthenticator.renewSelectedEndpointToken({ user: 'sandbox', pass: 'sandbox' });
// => "random token hash returned from the server"
