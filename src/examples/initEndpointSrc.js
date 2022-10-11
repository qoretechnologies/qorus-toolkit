// Initializes a new endpoint and returns it
// Optional user and pass parameters can be provided to initialize the endpoint and then authenticate the user
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
  user: 'sandbox',
  pass: 'sandbox',
});
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}
