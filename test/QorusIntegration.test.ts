'use strict';

import QorusIntegration from '../src/QorusIntegration';
import MockAdapter from 'axios-mock-adapter';
import httpsAxios from '../src/utils/httpsAxios';
import dotenv from 'dotenv';

dotenv.config();

describe('QorusLogin Utility Class Tests', () => {
  let mock: MockAdapter;
  let qorus: QorusIntegration;
  if(process.env.ENDPOINT)
  qorus = new QorusIntegration(process.env.ENDPOINT);

  beforeAll(() => {
    mock = new MockAdapter(httpsAxios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('When authentication is successful', () => {
    it('Should return user token after authentication', 
    async () => {
      const usrToken = '336d9306-3b70-41df-9427-c051d25886b2';
      mock
        .onPost(process.env.AUTHENDPOINT, {
          user: process.env.TESTUSER,
          pass: process.env.TESTPASS,
        })
        .reply(200, usrToken);

      let result;
      try {
        if(process.env.TESTUSER && process.env.TESTPASS)
        result = await qorus.login({
          user: process.env.TESTUSER,
          pass: process.env.TESTPASS,
        });

      } catch (error: any) {
        console.log(`${error.code} ${error.message}`);
      }

      console.log("this is result", result, "this is username", process.env.TESTUSER, "this is password", process.env.TESTPASS);

      expect(mock.history.post[0].data).not.toBeNull();
      expect(result).toEqual(usrToken);
    });

    it('Should return current user token if the user is authenticated', () => {
      expect(qorus.authToken).not.toBeNull();
    });

    it('should return the current endpoint', () => {
      const config = qorus.endpoint;

      expect(config).toEqual('https://hq.qoretechnologies.com:8092');
    });

    it('Should change the config', () => {
      qorus.endpoint = 'https://www.google.com';

      expect(qorus.endpoint).toEqual('https://www.google.com');
    });

    it('Should logout the user', async () => {
      mock
        .onPost(process.env.LOGOUTENDPOINT)
        .reply(200);
      
      await qorus.logout()

      expect(qorus.authToken).toEqual(null);
    });

  });
});
