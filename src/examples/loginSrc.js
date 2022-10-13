//Initialize the endpoint before authentication
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({ user: 'sandbox', pass: 'sandbox' });
// => "random token hash returned from the server"
