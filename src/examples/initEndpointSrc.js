// Initializes a new endpoint and returns it
await Qorus.orusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});
// => {"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":"latest"}
