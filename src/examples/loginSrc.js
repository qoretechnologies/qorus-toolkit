var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;

//Initialize the endpoint before authentication
const endpoint = QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
const token = await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });
// => "8a11c963-7360-4f02-a0aa-a526444d3e52"