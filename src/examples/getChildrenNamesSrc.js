await Qorus.QorusAuthenticator.initEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  user: 'sandbox',
  pass: 'sandbox',
});

// Browse data providers with context api
const dataProviderBrowse = await Qorus.QorusDataProvider.getApi();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
// {factory: 'factory', connection: 'connection', datasource: 'datasource' }
