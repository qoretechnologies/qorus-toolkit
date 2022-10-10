//Initialize the endpoint before authentication
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });
// => "random token hash returned from the server"
