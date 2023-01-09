Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  endpointId: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

const job = await QorusWorkflows.incrementAutoStart(1);
// => IIncrementDecrementAutoStart {updated, autostart, info, started}
