import { getKeyValLocal, setKeyValLocal } from './managers/LocalStorage';
import logger from './managers/logger';
import { ApiPaths, apiPathsInitial, createApiPaths, Version } from './utils/apiPaths';
import { QorusRequest } from './QorusRequest';

export interface Authenticator {
  /**
   * -login-function takes optional username and password parameters to authenticate the user.
   If the username and password is not provided it tries to authenticate using the locally stored token from the selected endpoint

   * token if the authentication is successful else returns undefined
   */
  login: (loginConfig: LoginParams) => Promise<string | undefined>;

  /**
   * -logout-function Logs out the current user from the selected endpoint
   *
   */
  logout: () => Promise<boolean>;

  /**
   * -initEndpoint-function Allows the user to add/initialize a new endpoint
   *
   * Returns the newly created endpoint
   */
  initEndpoint: (props: InitEndpoint) => Promise<Endpoint>;

  /**
   * -selectEndpoint-function Allows the user to select a endpoint from the endpoints array, logout the user from the current
   * selected endpoint
   *
   * @param id Id of the endpoint
   *
   * Returns endpoint if the operation is successful false otherwise.
   */
  selectEndpoint: (id: string) => Promise<Endpoint | undefined>;

  /**
   * -getSelectedEndpoint-function A getter to return selected endpoint
   *
   * Returns the selected endpoint if it's created or returns undefined
   */
  getSelectedEndpoint: () => Endpoint | undefined;

  /**
   * -renewSelectedEndpointToken-function Allows the user to renew the selected endpoint authentication token
   *
   * @param props {@link LoginParams} optional username and password can be provided
   * Returns token if the authentication is successful, undefined otherwise
   */
  renewSelectedEndpointToken: (props: LoginParams) => Promise<string | undefined>;

  /**
   * -getEndpointById-function A getter to return the endpoint if it exist in the endpoints array
   *
   * @param id ID of the endpoint ex: "rippy"
   *
   * Returns the endpoint {@link Endpoint} if the endpoint with the supplied id exist in the endpoints array, undefined otherwise.
   */
  getEndpointById: (id: string) => Endpoint | undefined;

  /** -setEndpointUrl-function A setter to set the url of the selected endpoint
   * @param url Base url for the endpoint
   * @param id Optional id parameter to change the url of a particular endpoint
   *
   * Returns url of the endpoint if the operation is successful, undefined otherwise
   */
  setEndpointUrl: (url: string, id?: string) => Promise<string | undefined>;

  /** -setEndpointVersion-function A setter to edit the version of the endpoint
   * @param version Version of the qorus api
   * @param id Optional id parameter to change the url of a particular endpoint from the endpoints array
   *
   * Returns version of the endpoint if the operation is successful, undefined otherwise
   *
   */
  setEndpointVersion: (version: Version, id?: string) => Promise<Version | undefined>;

  /** -getAuthToken-function A getter to return the auth token of the selected endpoint
   *
   * Returns token if the the selected endpoint exists and the user is authenticated, otherwise returns undefined
   */
  getAuthToken: () => string | undefined;

  /**
   * -getEndpointVersion-function A getter to get the api version of a endpoint
   *
   * @param id Optional id parameter to get the version of a particular endpoint
   *
   * Returns version of the selected endpoint or version of the the endpoint found by id,
   * if the endpoint doesn't exists it returns undefined
   */
  getEndpointVersion: (id?: string) => Version | undefined;

  /**
   * -getApiPaths-function A getter to return the api paths for the selected endpoint
   *
   * Returns ApiPaths for the selected endpoint if exists, otherwise returns default api paths
   */
  getApiPaths: () => ApiPaths;

  /**
   * -getAllEndpoints-function A getter to get all the available endpoints
   *
   * Returns endpoints array with all the available endpoints
   */
  getAllEndpoints: () => Endpoint[];
}

export interface LoginParams {
  user?: string;
  pass?: string;
}

export interface InitEndpoint {
  id: string;
  url: string;
  version?: Version;
}

export interface Endpoint {
  url: string;
  version: Version;
  id: string;
  authToken?: string;
}

export interface CheckAuth {
  url: string;
}

/**
 * Enables the user to authenticate with multiple user defined endpoints.
 * @returns QorusAuthenticator object with all the supporting operations
 * @Category QorusAuthenticator
 */
const _QorusAuthenticator: () => Authenticator = (): Authenticator => {
  //**Array of user defined endpoints */
  const endpoints: Endpoint[] = [];

  /**Api paths for the selected endpoint */
  let apiPaths: ApiPaths = apiPathsInitial;

  /**Selected endpoint from the endpoints array */
  let selectedEndpoint: Endpoint;

  let noauth = false;

  /**
   * A getter to return the endpoint if exist in the endpoints array
   */
  const getEndpointById = (id: string): Endpoint | undefined => {
    return endpoints.find((endpoint) => endpoint.id === id);
  };

  /**
   * Logs out the current user from the selected endpoint
   */
  const logout = async (): Promise<boolean> => {
    if (selectedEndpoint) {
      let successful = false;

      try {
        await QorusRequest.post({ endpointUrl: `${selectedEndpoint.url}${apiPaths.logout}` });

        selectedEndpoint.authToken = undefined;
        apiPaths = apiPathsInitial;
        noauth = false;
        successful = true;
      } catch (error: any) {
        logger.log({
          level: 'error',
          message: `Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`,
        });
      }

      return successful;
    }

    return Promise.resolve(false);
  };

  /**
   * Allows the user to select a endpoint from the endpoints array,
   * Logs out the user from the current selected endpoint
   */
  const selectEndpoint = async (id: string): Promise<Endpoint | undefined> => {
    const endpoint = getEndpointById(id);
    if (endpoint && endpoint.url) {
      if (selectedEndpoint.authToken) {
        await logout();
      }

      selectedEndpoint = endpoint;
      apiPaths = createApiPaths({ version: endpoint.version });

      return endpoint;
    }
    return undefined;
  };

  // Check if the server has noauth enabled
  const checkNoAuth = async (url: string): Promise<null> => {
    let resp;

    try {
      resp = await QorusRequest.get({ endpointUrl: `${url}${apiPaths.validateNoAuth}` });
      const _noauth = resp.data.noauth;

      if (typeof _noauth === 'boolean') {
        noauth = _noauth;
      }

      return null;
    } catch (error: any) {
      logger.log({
        level: 'error',
        message: `Couldn't check the noauth status: ${error.statusCode}, ErrorMessage: ${error.message}`,
      });
    }

    return null;
  };

  /**
   * Allows the user to add/initialize a new endpoint
   */
  const initEndpoint = async (props: InitEndpoint): Promise<Endpoint> => {
    const { id, url, version } = props;
    const newEndpoint: Endpoint = {
      url,
      id,
      version: version ? version : 'latest',
    };
    const endpoint = getEndpointById(id);

    if (!endpoint) {
      endpoints.push(newEndpoint);

      if (selectedEndpoint) {
        await selectEndpoint(id);
      } else {
        selectedEndpoint = newEndpoint;
      }

      await checkNoAuth(url);
      return newEndpoint;
    } else {
      endpoints.push(newEndpoint);

      if (selectedEndpoint) {
        await selectEndpoint(id);
      } else {
        selectedEndpoint = newEndpoint;
      }

      await checkNoAuth(url);
      return newEndpoint;
    }
  };

  /**
   * A getter that returns the selected endpoint
   */
  const getSelectedEndpoint = (): Endpoint | undefined => {
    return selectedEndpoint;
  };

  /**
   * Validates the local stored authentication token for the endpoint
   */
  const validateLocalUserToken = async (endpointId: string): Promise<string | 'invalid' | null> => {
    const authToken = getKeyValLocal(`auth-token-${endpointId}`);

    if (authToken) {
      try {
        const resp = await QorusRequest.get({
          endpointUrl: `${endpoints}${apiPaths.validateToken}`,
          data: { token: authToken },
        });

        if (typeof resp === 'string') {
          return authToken;
        }
      } catch (error: any) {
        if (error.code === '409') {
          return 'invalid';
        } else
          logger.log({
            level: 'error',
            message: `Can't validate token, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`,
          });
      }
    }

    return null;
  };

  /**
   * Enable the user to login to the selected endpoint
   */
  const login = async (loginConfig: LoginParams): Promise<string | undefined> => {
    if (!noauth) {
      const { user, pass } = loginConfig;
      const { id } = selectedEndpoint;
      const currentUserToken = await validateLocalUserToken(id);
      if (!(user && pass) && !currentUserToken) {
        logger.log({ level: 'error', message: 'Authentication is required with Username and Password' });

        return undefined;
      }

      if (currentUserToken && currentUserToken !== 'invalid') {
        selectedEndpoint.authToken = currentUserToken;
        return currentUserToken;
      } else
        try {
          const resp = await QorusRequest.post({
            endpointUrl: `${selectedEndpoint.url}${apiPaths.login}`,
            data: { user, pass },
          });
          const { token } = resp.data;
          selectedEndpoint.authToken = token;
          setKeyValLocal({ key: `auth-token-${id}`, value: token });

          return token;
        } catch (error: any) {
          logger.log({ level: 'error', message: `Couldn't sign in user ${error.statusCode} ${error.message}` });
        }
    }

    return undefined;
  };

  /**
   * Allows the user to renew the selected endpoint authentication token
   */
  const renewSelectedEndpointToken = async (props: LoginParams): Promise<string | undefined> => {
    const { user, pass } = props;

    let token;
    if (selectedEndpoint) {
      token = await login({ user, pass });
    }
    if (typeof token == 'string') return token;

    return undefined;
  };

  /**
   * A getter to return the auth token of the selected endpoint
   */
  const getAuthToken = (): string | undefined => {
    return selectedEndpoint.authToken;
  };

  /**
   * A getter to get the api version of a endpoint
   */
  const getEndpointVersion = (id?: string): Version | undefined => {
    if (id) {
      return getEndpointById(id)?.version;
    } else {
      if (selectedEndpoint) {
        return selectedEndpoint.version;
      }
    }

    return undefined;
  };

  /**
   * A setter to edit the version of the endpoint
   */
  const setEndpointVersion = async (
    version: Version,
    id: string = selectedEndpoint.id,
  ): Promise<Version | undefined> => {
    if (id) {
      const endpoint = getEndpointById(id);

      if (endpoint) {
        endpoints[endpoints.indexOf(endpoint)].version = version;

        if (selectedEndpoint.id === endpoint.id) {
          selectedEndpoint.version = version;
          apiPaths = createApiPaths({ version });
          await logout();
        }

        logger.log({ level: 'info', message: 'Changed endpoint version successfully.' });
        return version;
      }

      logger.log({ level: 'info', message: 'enpoint does not exist, please try again.' });
      return undefined;
    }

    logger.log({ level: 'info', message: 'id is required to change the version of a endpoint.' });
    return undefined;
  };

  /**
   * A setter to set the url of the selected endpoint
   */
  const setEndpointUrl = async (url: string, id: string = selectedEndpoint.id): Promise<string | undefined> => {
    if (id) {
      const endpoint = getEndpointById(id);

      if (endpoint) {
        endpoints[endpoints.indexOf(endpoint)].url = url;

        if (selectedEndpoint.id === endpoint.id) {
          selectedEndpoint.url = url;
          await logout();
        }

        logger.log({ level: 'info', message: 'Changed endpoint url successfully.' });
        return url;
      }

      logger.log({ level: 'info', message: 'enpoint does not exist, please try again.' });
      return undefined;
    }

    logger.log({ level: 'info', message: 'id is required to change the url of a endpoint.' });
    return undefined;
  };

  /**
   * A getter to return the api paths for the selected endpoint
   */
  const getApiPaths = (): ApiPaths => {
    return apiPaths;
  };

  /**
   * A getter to get all the available endpoints
   */
  const getAllEndpoints = (): Endpoint[] => {
    return endpoints;
  };

  return {
    initEndpoint,
    login,
    logout,
    getAuthToken,
    setEndpointUrl,
    selectEndpoint,
    getSelectedEndpoint,
    renewSelectedEndpointToken,
    getEndpointById,
    getEndpointVersion,
    setEndpointVersion,
    getApiPaths,
    getAllEndpoints,
  };
};

export const QorusAuthenticator: Authenticator = _QorusAuthenticator();
