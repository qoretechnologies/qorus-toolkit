Qorus.QorusAuthenticator.addEndpoint({
  url: 'https://sandbox.qoretechnologies.com',
  endpointId: 'rippy',
  version: 'latest',
});
await Qorus.QorusAuthenticator.login({
  user: 'sandbox',
  pass: 'sandbox',
});

// _get is a protected method used by other Qorus interfaces
const job = await QorusWorkflows.get(1);
// => IWorkflow {workflowid, name, enabled...}
