await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
  user: 'sandbox',
  pass: 'sandbox',
});

// Get Data Provider Types
const dataProviderTypes = await Qorus.DataProvider.getRecord({});

// Selecting factory Data Provider
const dataProviderFactories = await Qorus.DataProvider.getRecord({ select: dataProviderTypes[0] });

// Selecting db factory
const selectDb = dataProviderFactories.filter((obj) => obj.name === 'db')[0];

// Getting tables from db
const dbProvider = await Qorus.DataProvider.getRecord({
  select: selectDb,
  constructor_options: { datasource: 'pgsql:omquser/omquser@omquser%bee' },
});
