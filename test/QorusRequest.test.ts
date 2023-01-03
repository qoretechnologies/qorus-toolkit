import dotenv from 'dotenv';
import { QorusAuthenticator, QorusRequest } from '../src';
dotenv.config();

describe('QorusRequest Utility Tests', () => {
  beforeAll(async () => {
    QorusAuthenticator.addEndpoint({
      url: process.env.ENDPOINT!,
      endpointId: 'rippyRequest',
    });
    await QorusAuthenticator.login({
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });
  });

  it('Should make a post request and return the result', async () => {
    const result = await QorusRequest.post({
      path: '/api/latest/public/login',
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
    });
    const response = result as any;

    expect(typeof response?.data.token).toEqual('string');
  });

  it('Should make a get request and return the result', async () => {
    const result = await QorusRequest.get({
      path: '/api/latest/dataprovider/browse',
    });
    const response = result as any;

    expect(response?.data.type).toEqual('nav');
  });

  it('Should make a put request and return the result', async () => {
    const result = await QorusRequest.put({
      path: '/api/latest/dataprovider/browse',
      params: { context: 'api' },
    });
    const response = result as any;

    expect(response?.data.type).toEqual('nav');
  });

  // Todo delete request test
});
