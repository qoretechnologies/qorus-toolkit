import { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { QorusAuthenticator } from '../src';
import { QorusRequest } from '../src';
dotenv.config();

describe('QorusRequest Utility Tests', () => {
  beforeAll(() => {
    QorusAuthenticator.initEndpoint({ url: process.env.ENDPOINT!, id: 'rippy' });
  });

  it('Should make a post request and return the result', async () => {
    const result = await QorusRequest.post({
      path: '/api/latest/public/login',
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
    });
    const response = result as AxiosResponse;

    expect(typeof response?.data.token).toEqual('string');
  });

  it('Should make a get request and return the result', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const result = await QorusRequest.get({
      path: 'api/latest/dataprovider/browse',
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
    });
    const response = result as AxiosResponse;

    expect(response?.data.type).toEqual('nav');
  });

  it('Should make a put request and return the result', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const result = await QorusRequest.put({
      path: 'api/latest/dataprovider/browse',
      params: { context: 'api' },
    });
    const response = result as AxiosResponse;

    expect(response?.data.type).toEqual('nav');
  });

  // Todo delete request test
});
