await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://hq.qoretechnologies.com:8092',
  version: 'latest',
});

Qorus.QorusAuthenticator.getAllEndpoints();
// => [{ "url":"https://hq.qoretechnologies.com:8092","id":"rippy","version": "latest" }]
