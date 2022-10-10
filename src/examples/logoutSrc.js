//Initialize the endpoint before authentication
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});
// Log in first
await Qorus.QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });
// Logs out the user
await Qorus.QorusAuthenticator.logout();
// => void
