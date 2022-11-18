import dotenv from 'dotenv';
import { QorusAuthenticator } from '../src';
import logger, { errorTypes } from '../src/managers/logger';

dotenv.config();

const loggerMock = jest.spyOn(logger, 'log');

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusLogin Utility Class Tests', () => {
  jest.setTimeout(30000);
  it('Should initialize the endpoint and assign it to the selected endpoint', async () => {
    await QorusAuthenticator.initEndpoint({ url: process.env.ENDPOINT!, id: 'rippy' });

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
    if (process.env.ENDPOINT) await QorusAuthenticator.initEndpoint({ url: process.env.ENDPOINT, id: 'test' });

    expect(QorusAuthenticator.selectEndpoint('test')).toMatchSnapshot();
  });

  describe('QorusLogin Utility Error Tests', () => {
    it('Should throw an error when user tries to authenticate with wrong credentials', async () => {
      if (process.env.ENDPOINT) await QorusAuthenticator.initEndpoint({ url: process.env.ENDPOINT, id: 'rippy' });
      await QorusAuthenticator.login({ user: 'bob', pass: 'pass' });

      expect(loggerMock).toHaveBeenCalled();
    });

    it('Should throw an error if the user does not provide username and password for authentication.', async () => {
      if (process.env.ENDPOINT) await QorusAuthenticator.initEndpoint({ url: process.env.ENDPOINT, id: 'rippy' });
      await QorusAuthenticator.login({});

      expect(loggerMock).toHaveBeenCalled();
    });
  });
});

describe('Qorus Authenticator Callback tests', () => {
  beforeAll(async () => {
    await QorusAuthenticator.initEndpoint({ url: process.env.ENDPOINT!, id: 'rippyFAllback' });
  });

  it('Should return user token as a result to the callback after authentication (login)', async () => {
    let token;
    await QorusAuthenticator.login(
      { user: process.env.TESTUSER!, pass: process.env.TESTPASS! },
      (err?: Error, result?: any) => {
        if (err) {
          token = err;
          return;
        } else {
          token = result;
        }
      },
    );

    expect(typeof token).toEqual('string');
  });

  it('Should return authentication error if the authentication fails and return it to the callback', async () => {
    let tokenErr;
    await QorusAuthenticator.login({ user: 'test', pass: 'test' }, (err?: Error) => {
      if (err) {
        tokenErr = err;
        return;
      }
    });
    console.log(tokenErr);

    expect(tokenErr.name).toEqual(errorTypes.authenticationError);
  });

  // it('Should return general authenticator error if the logout is not successful', async () => {
  //   let tokenErr;
  //   await QorusAuthenticator.logout((err?: Error) => {
  //     if (err) {
  //       tokenErr = err;
  //       return;
  //     }
  //   });
  //   expect(tokenErr.name).toEqual(errorTypes.generalAuthenticatorError);
  // });

  it('Should return general authenticator error if id for the endpoint is invalid', async () => {
    let tokenErr;
    await QorusAuthenticator.selectEndpoint('rippy5', (err?: Error) => {
      if (err) {
        tokenErr = err;
        return;
      }
    });
    expect(tokenErr.name).toEqual(errorTypes.generalAuthenticatorError);
  });

  it('Should return general authenticator error if id and url for the endpoint is invalid', async () => {
    let tokenErr;
    await QorusAuthenticator.initEndpoint({ id: '', url: '' }, (err?: Error) => {
      if (err) {
        tokenErr = err;
        return;
      }
    });
    expect(tokenErr.name).toEqual(errorTypes.generalAuthenticatorError);
  });

  // it('Should return authentication error if the noauth request failed', async () => {
  //   let tokenErr;
  //   await QorusAuthenticator.checkNoAuth((err?: Error) => {
  //     if (err) {
  //       tokenErr = err;
  //       return;
  //     }
  //   });
  //   expect(tokenErr.name).toEqual(errorTypes.authenticationError);
  // });
});
