await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({ user: 'sandbox', pass: 'sandbox' });

Qorus.QorusAuthenticator.getAuthToken();
// => "random token hash returned from the server"
