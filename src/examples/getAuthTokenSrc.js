var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });

const token = QorusAuthenticator.getAuthToken();
// => "8a11c963-7360-4f02-a0aa-a526444d3e52"