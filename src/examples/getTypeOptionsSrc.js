Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
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

// Get qore type for the provided constructor option
options.getType('datasource');
// => ["string", "object<AbstractDatasource>"]
