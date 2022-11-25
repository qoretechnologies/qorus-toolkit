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

// Set required constructor option
options.set('datasource', 'pgsql:omquser/omquser@omquser%bee');
// => {name: "datasource", required: true, types: ["string", "object<AbstractDatasource>"], jsTypes: ["string", "oject"], value: {type: "string", value: "pgsql:omquser/omquser@omquser%bee"}}
