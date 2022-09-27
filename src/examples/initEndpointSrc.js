var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;

// Initializes a new endpoint and returns it
const endpoint = await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
// => {"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":"latest"}