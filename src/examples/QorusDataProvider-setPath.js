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
const dataProviderBrowse = await Qorus.QorusDataProvider.getApi();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
const factory = await dataProviderBrowse.get(browseChildrenNames.factory);

// Setter to set the api path for a provider
factory.setPath(['/api/latest/dataprovider/browse', 'factory']);
