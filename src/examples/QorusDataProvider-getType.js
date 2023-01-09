Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  endpointId: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Browse data providers with context type
const dataProviderBrowse = await Qorus.QorusDataProvider.getType();

// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
