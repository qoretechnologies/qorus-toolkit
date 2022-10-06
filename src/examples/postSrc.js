const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
const data = { message: 'qorus request test' };

const result = await Qorus.QorusRequest.post({
  endpointUrl: 'https://sandbox.qoretechnologies.com/',
  headers: headers,
  data: data,
});
