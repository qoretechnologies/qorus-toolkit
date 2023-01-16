Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  endpointId: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});
// Browse data providers with context api
const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
const factory = await dataProviderBrowse.get(browseChildrenNames.factory);

const allOptions = factory.getOptions('db');
// => QorusOptions {name: "db", providerOptions: [{name: ..., required: ..., types: [...], jsTypes: [...], value: ...}]}
