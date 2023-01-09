Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  endpointId: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Browse data providers with context message
const dataProviderBrowse = await Qorus.QorusDataProvider.getMessage();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
const factory = await dataProviderBrowse.getMessage(browseChildrenNames.factory);
// => ProviderWithOptions { path: ..., responseData: {...}, providerData: {...}, responseError: {...}, context: ...}
