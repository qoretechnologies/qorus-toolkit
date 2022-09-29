import dotenv from 'dotenv';
import { QorusAuthenticator as QorusAuth } from '../src';
import logger from '../src/managers/logger';

dotenv.config();

const winstonLoggerMock = jest.spyOn(logger, 'log');

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusLogin Utility Class Tests', () => {
  it('Should initialize the endpoint and assign it to the selected endpoint', () => {
    QorusAuth.initEndpoint({ url: process.env.ENDPOINT!, id: 'rippy' });

    const endpoint = QorusAuth.getSelectedEndpoint();
    expect(endpoint).toMatchSnapshot();
  });

  it('Should return user token after authentication', async () => {
    const token = await QorusAuth.login({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });

    expect(token).not.toBeNull();
  });

  it('Should return the enpoint from the endpoints array', () => {
    const endpoint = QorusAuth.getEndpointById('rippy');

    expect(endpoint?.id).toEqual('rippy');
  });

  it('Should return all the available endpoints ', () => {
    const endpoints = QorusAuth.getAllEndpoints();

    expect(endpoints).not.toBeNull();
  });

  it('Should return version of the selected endpoint', () => {
    const version = QorusAuth.getEndpointVersion();

    expect(version).toEqual('latest');
  });

  it('Should return api paths for the selected endpoint', () => {
    expect(QorusAuth.getApiPaths()).toMatchSnapshot();
  });

  it('Should set a new version for the endpoint', async () => {
    expect(await QorusAuth.setEndpointVersion(5)).toMatchSnapshot();
  });

  it('Should revalidate the user auth token for the selected endpoint', async () => {
    await QorusAuth.renewSelectedEndpointToken({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });
    const token = QorusAuth.getAuthToken();

    expect(typeof token).toEqual('string');
  });

  it('Should return current user token if the user is authenticated', () => {
    const token = QorusAuth.getAuthToken();

    expect(typeof token).toEqual('string');
  });

  it('Should return the current endpoint', () => {
    const config = QorusAuth.getSelectedEndpoint();

    expect(config!.id).toMatchSnapshot();
  });

  it('Should return all the endpoints', () => {
    const endpoints = QorusAuth.getAllEndpoints();

    expect(endpoints.length).toMatchSnapshot();
  });

  it('Should change the selected endpoint url and logout the user', async () => {
    const url = await QorusAuth.setEndpointUrl('https://testme.com');

    expect(url).toMatchSnapshot();
    expect(QorusAuth.getAuthToken()).toBeUndefined();
  });

  it('Should select the endpoint by the provided id', async () => {
    if (process.env.ENDPOINT) QorusAuth.initEndpoint({ url: process.env.ENDPOINT, id: 'test' });

    expect(QorusAuth.getSelectedEndpoint()).toMatchSnapshot();
  });

  describe('QorusLogin Utility Error Tests', () => {
    it('Should throw an error when user tries to authenticate with wrong creadentials', async () => {
      if (process.env.ENDPOINT) await QorusAuth.initEndpoint({ url: process.env.ENDPOINT, id: 'rippy' });
      await QorusAuth.login({ user: 'bob', pass: 'pass' });

      expect(winstonLoggerMock).toHaveBeenCalled();
    });

    it('Should throw an error if the user does not provide username and password for authentication.', async () => {
      if (process.env.ENDPOINT) await QorusAuth.initEndpoint({ url: process.env.ENDPOINT, id: 'rippy' });
      await QorusAuth.login({});

      expect(winstonLoggerMock).toHaveBeenCalled();
    });
  });
});
