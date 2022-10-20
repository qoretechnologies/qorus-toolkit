await Qorus.QorusAuthenticator.initEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  user: 'sandbox',
  pass: 'sandbox',
});

// Browse data providers with context type
const dataProviderBrowse = await Qorus.QorusDataProvider.getType();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
const factory = await dataProviderBrowse.get(browseChildrenNames.factory);
// => ProviderWithOptions { path: ..., responseData: {...}, providerData: {...}, responseError: {...}, context: ...}
