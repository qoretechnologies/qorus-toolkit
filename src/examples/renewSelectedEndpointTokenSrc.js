var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });

// Renews auth-token for the selected endpoint
const token = await QorusAuthenticator.renewSelectedEndpointToken({ user: 'rmalik', pass: 'rmalik1234' });
// => "8a11c963-7360-4f02-a0aa-a526444d3e52"