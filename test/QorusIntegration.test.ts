import { QorusAuth } from '../src';
import MockAdapter from 'axios-mock-adapter';
import httpsAxios from '../src/utils/httpsAxios';
import dotenv from 'dotenv';
import { assert } from 'console';

dotenv.config();

describe('QorusLogin Utility Class Tests', () => {
  let mock: MockAdapter;
  // let qorus: QorusIntegration;
  if (process.env.ENDPOINT)
    // qorus = new QorusIntegration(process.env.ENDPOINT);

    beforeAll(() => {
      mock = new MockAdapter(httpsAxios);
    });

  afterEach(() => {
    mock.reset();
  });

  describe('When authentication is successful', () => {
    it('Should initialize the endpoint and assign it to selected endpoint', () => {
      if (process.env.ENDPOINT) QorusAuth.initEndpoint({ url: process.env.ENDPOINT, id: 'reppy' });

      expect(QorusAuth.getSelectedEndpoint()!.id).toEqual('reppy');
      expect(QorusAuth.getSelectedEndpoint()!.url).toEqual('https://hq.qoretechnologies.com:8092');
    });

    it('Should return user token after authentication', async () => {
      const usrToken = '336d9306-3b70-41df-9427-c051d25886b2';
      mock
        .onPost(process.env.AUTHENDPOINT, {
          user: process.env.TESTUSER,
          pass: process.env.TESTPASS,
        })
        .reply(200, usrToken);

      await QorusAuth.login({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });
      expect(QorusAuth.getSelectedEndpoint()?.authToken === usrToken);
    });

    it('Should return current user token if the user is authenticated', () => {
      expect(QorusAuth.getAuthToken()).not.toBeNull();
    });

    it('Should return the current endpoint', () => {
      const config = QorusAuth.getSelectedEndpoint();

      expect(config!.id).toEqual('reppy');
    });

    it('Should return all the endpoints', () => {
      const endpoints = QorusAuth.getAllEndpoints();
      expect(endpoints).not.toBeNull();
    });

    it('Should logout the user', async () => {
      mock.onPost('https://hq.qoretechnologies.com:8092/api/latest/logout').reply(200);
      await QorusAuth.logout();
      expect(QorusAuth.getSelectedEndpoint()!.authToken).toEqual(undefined);
    });

    it('Should change the selected endpoint url', () => {
      QorusAuth.setEndpointUrl({ url: 'https://www.google.com' });

      expect(QorusAuth.getSelectedEndpoint()?.url).toEqual('https://www.google.com');
    });
  });
});
