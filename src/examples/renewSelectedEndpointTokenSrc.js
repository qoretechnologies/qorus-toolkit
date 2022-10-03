await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});

// Renews auth-token for the selected endpoint
await Qorus.QorusAuthenticator.renewSelectedEndpointToken({ user: 'rmalik', pass: 'rmalik1234' });
// => "random token hash returned from the server"
