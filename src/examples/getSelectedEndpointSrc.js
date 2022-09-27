var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });

// Returns selected endpoint
const endpoint = await QorusAuthenticator.getSelectedEndpoint();
// => {"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":"latest"}