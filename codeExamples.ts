export default {
  getEndpointById: `await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Returns the endpoint if exists in the endpoints array
await Qorus.QorusAuthenticator.getEndpointById('rippy');
// => {"url":"https://sandbox.qoretechnologies.com","id":"rippy","version":"latest"}"`,
  getAllEndpoints: `await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

Qorus.QorusAuthenticator.getAllEndpoints();
// => [{ "url":"https://sandbox.qoretechnologies.com","id":"rippy","version": "latest" }]
`,
  get: `
// First we initialize an Endpoint and provider user and pass to authenticate the user along with it
Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Next we initialize a get request against our defined Qorus server
const result = await Qorus.QorusRequest.get({
  path: '/api/latest/dataprovider/browse',
});
`,
  post: `// First we initialize an Endpoint
Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Then we define the data object for the post request
const data = { user: 'sandbox', pass: 'sandbox' };

// Next we initialize a post request against our defined Qorus server
const result = await Qorus.QorusRequest.post({
  path: '/api/latest/public/login',
  data: data,
});
`,
  put: `// First we initialize an Endpoint and provider user and pass to authenticate the user along with it
Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  id: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Next we initialize a put request against our defined Qorus server
const result = await Qorus.QorusRequest.put({
  path: '/api/latest/dataprovider/browse',
  data: { context: 'api' },
});
`,
  deleteReq: `// First we initialize an Endpoint and provider user and pass to authenticate the user along with it
Qorus.QorusAuthenticator.addEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// Next we initialize a delete request against our defined Qorus server
const result = await Qorus.QorusRequest.delete({
  path: '/api/latest/classes/1',
});
`,
  getRecord: `Qorus.QorusAuthenticator.addEndpoint({
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
  // List children names
  const browseChildrenNames = dataProviderBrowse.getChildrenNames();
  `,
  getType: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data providers with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getType();
  // List children names
  const browseChildrenNames = dataProviderBrowse.getChildrenNames();
  `,
  getApi: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data providers with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getApi();
  // List children names
  const browseChildrenNames = dataProviderBrowse.getChildrenNames();
  `,
  getEvent: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data providers with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getEvent();
  // List children names
  const browseChildrenNames = dataProviderBrowse.getChildrenNames();
  `,
  getMessage: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data providers with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getMessage();
  // List children names
  const browseChildrenNames = dataProviderBrowse.getChildrenNames();
  `,
  has: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data providers with context api
  const dataProviderBrowse = await Qorus.QorusDataProvider.getApi();
  // Select factory provider
  const browseChildrenNames = dataProviderBrowse.getChildrenNames();
  const factory = await dataProviderBrowse.get(browseChildrenNames.factory);
  // => ProviderWithOptions { path: ..., responseData: {...}, providerData: {...}, responseError: {...}, context: ...}
  
  factory.has('db');
  // => true
  `,
  getChildrenNames: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
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
  `,
  getProvider: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
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
  `,
  getOptions: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data provider with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
  
  // Select factory provider
  const factoryProvider = await dataProviderBrowse.get('factory');
  
  // Select db provider
  const options = factoryProvider.getOptions('db');`,
  getAllOptions: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data provider with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
  
  // Select factory provider
  const factoryProvider = await dataProviderBrowse.get('factory');
  
  // Select db provider
  const options = factoryProvider.getAllOptions('db');`,
  hasData: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data provider with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
  
  // Select factory provider
  const factoryProvider = await dataProviderBrowse.get('factory');
  
  // Select db provider
  const options = factoryProvider.hasData();
  // => true`,
  getData: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data provider with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
  
  // Select factory provider
  const factoryProvider = await dataProviderBrowse.get('factory');
  
  // Select db provider
  const options = factoryProvider.getData();
  // => {providerData: ..., responseData: ..., errorData: ...}`,
  getPath: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data provider with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
  
  // Select factory provider
  const factoryProvider = await dataProviderBrowse.get('factory');
  
  // Select db provider
  const options = factoryProvider.getPath();
  // => [browse,factory]`,
  getFinalPath: `Qorus.QorusAuthenticator.addEndpoint({
    url: 'https://sandbox.qoretechnologies.com',
    id: 'rippy',
    version: 'latest',
  });
  await Qorus.QorusAuthenticator.login({
    user: 'sandbox',
    pass: 'sandbox',
  });
  
  // Browse data provider with context record
  const dataProviderBrowse = await Qorus.QorusDataProvider.getRecord();
  
  // Select factory provider
  const factoryProvider = await dataProviderBrowse.get('factory');
  
  // Select db provider
  const options = factoryProvider.getFinalPath();
  // => /browse/factory`,
};
