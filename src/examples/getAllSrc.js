Qorus.QorusAuthenticator.addEndpoint({
  endpointId: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});
// Browse data provider with context record
const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();

// Select factory provider
const factoryProvider = await dataProviderBrowse.get('factory');

// Select db provider
const options = factoryProvider.getOptions('db');

// Set required constructor option
options.set('datasource', 'pgsql:omquser/omquser@omquser%bee');

// Returns all the the constructor properties with their values, throws error if any required property have not been provided and return undefined.
options.getAll();
// => {datasource: "pgsql:omquser/omquser@omquser%bee"}
