var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;
await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });

const apiPaths = QorusAuthenticator.getAllEndpoints();
// => [{"url":"https://hq.qoretechnologies.com:8092","id":"rippy","version":5,"authToken":"c27d7176-5d83-4fb9-9880-ac45cb0c409f"}]