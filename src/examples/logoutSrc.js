var qorusAuth = require("@qoretechnologies/qorus-toolkit");
const { QorusAuthenticator } = qorusAuth;

// Logs out the user
await QorusAuthenticator.logout();