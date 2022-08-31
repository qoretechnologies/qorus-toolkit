import { QorusAuth } from '../src';
import MockAdapter from 'axios-mock-adapter';
import httpsAxios from '../src/utils/httpsAxios';
import dotenv from 'dotenv';

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
      if (process.env.ENDPOINT) QorusAuth.initEndpnt({ url: process.env.ENDPOINT, id: 'reppy' });

      expect(QorusAuth.getSelectedEndpnt()!.id).toEqual('reppy');
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
      expect(QorusAuth.getSelectedEndpnt()?.authToken === usrToken);
    });

    it('Should return current user token if the user is authenticated', () => {
      expect(QorusAuth.getAuthToken()).not.toBeNull();
    });

    it('Should return the current endpoint', () => {
      const config = QorusAuth.getSelectedEndpnt();

      expect(config!.id).toEqual('reppy');
    });

    it('Should return all the endpoints', () => {
      const endpoints = QorusAuth.getAllEndpnts();
      console.log('These are endpoints', JSON.stringify(endpoints));
    });

    it('Should logout the user', async () => {
      mock.onPost(process.env.LOGOUTENDPOINT).reply(200);

      await QorusAuth.logout();
      expect(QorusAuth.getSelectedEndpnt()!.authToken).toEqual(undefined);
    });

    it('Should change the selected endpoint url', () => {
      QorusAuth.setEndpntUrl({ url: 'https://www.google.com' });

      expect(QorusAuth.getSelectedEndpnt()?.url).toEqual('https://www.google.com');
    });
  });
});
