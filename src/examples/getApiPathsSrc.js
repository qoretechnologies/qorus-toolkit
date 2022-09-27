var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });

const apiPaths = QorusAuthenticator.getApiPaths();
// => {"login":"/api/latest/public/login","logout":"/api/latest/logout","validateToken":"/api/latest/system?action=validateWsToken","validateNoAuth":"/api/latest/public/info"}