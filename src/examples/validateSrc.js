await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
  user: 'sandbox',
  pass: 'sandbox',
});

// Browse data provider with context record
const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();

// Select factory provider
const factoryProvider = await dataProviderBrowse.get('factory');

// Select db provider
const options = factoryProvider.getOptions('db');

// Set required constructor option
options.set('datasource', 'pgsql:omquser/omquser@omquser%bee');

// Validate if all the required constructor properties are provided
options.validate();
// => true

// Fetch db provider
const dbProvider = await factoryProvider.get('db', options);
// => { erp_order_import: 'erp_order_import', external_gl_journal: 'external_gl_journal', gl_record: 'gl_record', order_items: 'order_items', orders: 'orders', table_1: 'table_1', table_2: 'table_2', 'type:record': 'type:record' }
