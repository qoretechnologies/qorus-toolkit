import MockAdapter from 'axios-mock-adapter';
import { httpsAxios, QorusRequest } from '../src/QorusRequest';

describe('QorusRequest Utility Tests', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(httpsAxios);
  });
  afterEach(() => {
    mock.reset();
  });
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  const data = { message: 'qorus request test' };

  it('Should make a get request and return the result', async () => {
    mock.onGet('https://www.testme.com', { headers: headers }).reply(200, { data: 'request with custom headers' });

    await QorusRequest.get({ endpointUrl: 'https://www.testme.com', headers: headers });
    expect(mock.history.get[0].headers).toEqual(headers);
  });

  it('Should make a post request and return the result', async () => {
    mock.onPost('https://www.testme.com', { headers: headers, data: data }).reply(200, 'post request');

    await QorusRequest.post({ endpointUrl: 'https://www.testme.com', headers: headers, data: data });
    expect(mock.history.post[0].data).toEqual(JSON.stringify(data));
  });

  it('Should make a put request and return the result', async () => {
    mock.onPost('https://www.testme.com', { headers: headers, data: data }).reply(200, 'post request');

    await QorusRequest.put({ endpointUrl: 'https://www.testme.com', headers: headers, data: data });
    expect(mock.history.put[0].data).toEqual(JSON.stringify(data));
  });

  it('Should make a delete request and return the result', async () => {
    mock.onPost('https://www.testme.com', { headers: headers, data: data }).reply(200, 'post request');

    await QorusRequest.deleteReq({ endpointUrl: 'https://www.testme.com', headers: headers, data: data });
    expect(mock.history.delete[0].data).toEqual(JSON.stringify(data));
  });
});
