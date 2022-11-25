//Initialize the endpoint before authentication
Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});

// Log in first
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Logs out the user
await Qorus.QorusAuthenticator.logout();
// => void
