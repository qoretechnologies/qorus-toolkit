// Initializes a new endpoint and returns it
await Qorus.orusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}
