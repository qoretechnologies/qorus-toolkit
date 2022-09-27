var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });

// Changes selected endpoint and return true if selected
const endpoint = await QorusAuthenticator.selectEndpoint('rippy');
// => {"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":"latest"}