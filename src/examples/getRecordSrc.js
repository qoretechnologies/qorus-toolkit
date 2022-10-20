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

// Get object with children names
const dbChildren = db.getChildrenNames();
// => { erp_order_import: 'erp_order_import', external_gl_journal: 'external_gl_journal', gl_record: 'gl_record', order_items: 'order_items', orders: 'orders', table_1: 'table_1', table_2: 'table_2', 'type:record': 'type:record' }
