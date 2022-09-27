var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });

// Returns the endpoint if exists in the endpoints array
const endpoint = await QorusAuthenticator.getEndpointById('rippy');
// => {"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":"latest"}