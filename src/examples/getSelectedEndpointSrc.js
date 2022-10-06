await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});

// Returns selected endpoint
await Qorus.QorusAuthenticator.getSelectedEndpoint();
// => {"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":"latest"}
