Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  endpointId: 'rippy',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});
// Browse data providers with context api
const dataProviderBrowse = await Qorus.QorusDataProvider.getApi();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
// {factory: 'factory', connection: 'connection', datasource: 'datasource' }
