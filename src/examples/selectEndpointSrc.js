await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});

// Changes selected endpoint and return true if selected
await Qorus.QorusAuthenticator.selectEndpoint('rippy');
// => {"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":"latest"}
