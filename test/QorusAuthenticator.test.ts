import dotenv from 'dotenv';
import { QorusAuthenticator } from '../src';
import ErrorAxios from '../src/managers/error/ErrorAxios';
import ErrorInternal from '../src/managers/error/ErrorInternal';
import logger from '../src/managers/logger';

dotenv.config();

const loggerMock = jest.spyOn(logger, 'log');

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusLogin Utility Class Tests', () => {
  jest.setTimeout(30000);
  it('Should initialize the endpoint and assign it to the selected endpoint', () => {
    QorusAuthenticator.addEndpoint({ url: process.env.ENDPOINT!, id: 'rippy' });

    const endpoint = QorusAuthenticator.getSelectedEndpoint();
    expect(endpoint).toMatchSnapshot();
  });

  it('Should return user token after authentication (login)', async () => {
    let token = await QorusAuthenticator.login({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });

    expect(typeof token).toEqual('string');
  });

  it('Should return true after successfully loging out the user ', async () => {
    await QorusAuthenticator.login({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });
    const logoutResult: boolean = await QorusAuthenticator.logout();

    expect(logoutResult).toEqual(true);
  });

  it('Should return the enpoint from the endpoints array', () => {
    const endpoint = QorusAuthenticator.getEndpointById('rippy');

    expect(endpoint?.id).toEqual('rippy');
  });

  it('Should return all the available endpoints ', () => {
    const endpoints = QorusAuthenticator.getAllEndpoints();

    expect(endpoints).not.toBeNull();
  });

  it('Should return version of the selected endpoint', () => {
    const version = QorusAuthenticator.getEndpointVersion();

    expect(version).toEqual('latest');
  });

  it('Should return api paths for the selected endpoint', () => {
    expect(QorusAuthenticator.getApiPaths()).toMatchSnapshot();
  });

  it('Should set a new version for the endpoint', async () => {
    expect(await QorusAuthenticator.setEndpointVersion(5)).toMatchSnapshot();
  });

  it('Should revalidate the user auth token for the selected endpoint', async () => {
    await QorusAuthenticator.setEndpointVersion('latest');
    await QorusAuthenticator.renewSelectedEndpointToken({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });
    const token = QorusAuthenticator.getAuthToken();

    expect(typeof token).toEqual('string');
  });

  it('Should return current user token if the user is authenticated', () => {
    const token = QorusAuthenticator.getAuthToken();

    expect(typeof token).toEqual('string');
  });

  it('Should return the current endpoint', () => {
    const config = QorusAuthenticator.getSelectedEndpoint();

    expect(config!.id).toMatchSnapshot();
  });

  it('Should return all the endpoints', () => {
    const endpoints = QorusAuthenticator.getAllEndpoints();

    expect(endpoints.length).toMatchSnapshot();
  });

  it('Should change the selected endpoint url and logout the user', async () => {
    const url = await QorusAuthenticator.setEndpointUrl('https://testme.com');

    expect(url).toMatchSnapshot();
    expect(QorusAuthenticator.getAuthToken()).toBeUndefined();
  });

  it('Should select the endpoint by the provided id', async () => {
    if (process.env.ENDPOINT) QorusAuthenticator.addEndpoint({ url: process.env.ENDPOINT, id: 'test' });

    expect(QorusAuthenticator.selectEndpoint('test')).toMatchSnapshot();
  });

  // it.only('Should create a new endpoint with port accessible', async () => {
  //   let endpoint: Endpoint | undefined;
  //   if (process.env.ENDPOINT) {
  //     endpoint = QorusAuthenticator.addEndpoint({
  //       url: 'https://hq.qoretechnologies.com:31011',
  //       id: 'rippyPort',
  //     });
  //   }
  //   await QorusAuthenticator.login({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });
  //   expect(typeof endpoint?.authToken).toEqual('string');
  // });
});

describe('QorusLogin Utility Error Tests', () => {
  it('Should throw an Authentication Error when user tries to authenticate with wrong credentials', async () => {
    let err;
    try {
      if (process.env.ENDPOINT) QorusAuthenticator.addEndpoint({ url: process.env.ENDPOINT, id: 'rippy2' });
      await QorusAuthenticator.login({ user: 'bob', pass: 'pass' });
    } catch (error) {
      err = error;
    }
    console.log(err);
    expect(err instanceof ErrorAxios).toEqual(true);
  });

  it('Should throw an error if the user does not provide username and password for authentication.', async () => {
    let err;
    try {
      if (process.env.ENDPOINT) QorusAuthenticator.addEndpoint({ url: process.env.ENDPOINT, id: 'rippy2' });
      await QorusAuthenticator.login();
    } catch (error) {
      err = error;
    }
    expect(err instanceof ErrorInternal).toEqual(true);
  });

  it('Should throw an Internal Error if the id and url are not valid to initialize an endpoint', async () => {
    let err;
    try {
      if (process.env.ENDPOINT) QorusAuthenticator.addEndpoint({ url: '', id: '' });
    } catch (error) {
      err = error;
    }
    expect(err instanceof ErrorInternal).toEqual(true);
  });

  it('Should throw an Authentication error if the username and pass is not valid while initializing endpoint', async () => {
    try {
      if (process.env.ENDPOINT)
        QorusAuthenticator.addEndpoint({
          url: process.env.ENDPOINT,
          id: 'rippy2',
        });
      await QorusAuthenticator.login({
        user: '',
        pass: '',
      });
    } catch (error) {
      console.error(error);
    }
    expect(loggerMock).toHaveBeenCalled();
  });

  it('Should throw an Internal error if the no-auth status cannot be checked', async () => {
    let err;
    try {
      if (process.env.ENDPOINT)
        QorusAuthenticator.addEndpoint({
          url: 'https://sandbox.qoretechnologies.',
          id: 'rippy2',
        });
      await QorusAuthenticator.login({
        user: 'some',
        pass: 'some',
      });
    } catch (error) {
      err = error;
    }
    expect(err instanceof ErrorInternal).toEqual(true);
  });

  it('Should throw an Internal error if url is not valid for initializing endpoint', async () => {
    let err;
    try {
      if (process.env.ENDPOINT)
        QorusAuthenticator.addEndpoint({
          url: '',
          id: 'rippy2',
        });
    } catch (error) {
      err = error;
    }
    expect(err instanceof ErrorInternal).toEqual(true);
  });

  it('Should throw an Internal error if id is not valid for initializing endpoint', async () => {
    let err;
    try {
      if (process.env.ENDPOINT)
        QorusAuthenticator.addEndpoint({
          url: 'https://sandbox.qoretechnologies.com',
          id: '',
        });
    } catch (error) {
      err = error;
    }
    expect(err instanceof ErrorInternal).toEqual(true);
  });

  it('Should throw an Internal error if id and url is not valid for initializing endpoint', async () => {
    let err;
    try {
      if (process.env.ENDPOINT)
        QorusAuthenticator.addEndpoint({
          url: '',
          id: '',
        });
    } catch (error) {
      err = error;
    }
    expect(err instanceof ErrorInternal).toEqual(true);
  });
});
