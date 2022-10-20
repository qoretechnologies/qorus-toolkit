await Qorus.QorusAuthenticator.initEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  user: 'sandbox',
  pass: 'sandbox',
});

// Browse data providers with context record
const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
// Select factory provider
const browseChildrenNames = dataProviderBrowse.getChildrenNames();
const factory = await dataProviderBrowse.get(browseChildrenNames.factory);
const factoryChildrenNames = factory.getChildrenNames();

// Select db factory
const db = await factory.get(factoryChildrenNames.db, { datasource: 'pgsql:omquser/omquser@omquser%bee' });
const dbChildren = db.getChildrenNames();
