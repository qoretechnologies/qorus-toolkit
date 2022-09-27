var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });

const url = await QorusAuthenticator.setEndpointUrl('https://www.google.com','rippy');
// =>'https://www.google.com'