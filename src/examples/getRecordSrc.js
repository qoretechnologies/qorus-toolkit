Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Browse data providers with context record
const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
