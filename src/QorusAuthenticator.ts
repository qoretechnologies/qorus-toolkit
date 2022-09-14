import { getKeyValLocal, setKeyValLocal } from './managers/LocalStorage';
import logger from './managers/logger';
import { ApiPaths, apiPathsInitial, createApiPaths, Version } from './utils/apiPaths';
import { QorusReq } from './utils/QorusRequest';

export interface Authenticator {
  /**
   * Enable the user to login to the selected endpoint
   *
   * <script src="https://embed.runkit.com"  data-element-id="login"></script>
   * <h3>Example</h3>
   * <div id="logout">
   *
   * var qorusAuth = require("@qoretechnologies/qorus-toolkit")
   * await qorusAuth.login();
   * </div>
   *
   */
  login: (loginConfig: LoginParams) => Promise<string | undefined>;
  /**
   * Logs out the current user from the selected endpoint
   *
   * <script src="https://embed.runkit.com"  data-element-id="logout"></script>
   * <h3>Example</h3>
   * <div id="logout">
   *
   * var qorusAuth = require("@qoretechnologies/qorus-toolkit")
   * await qorusAuth.logout();
   * </div>
   *
   */
  logout: () => Promise<void>;
  /**
   * Allows the user to add/initialize a new endpoint
   *
   * <script src="https://embed.runkit.com"  data-element-id="init-element"></script>
   * <h3>Example</h3>
   * <div id="init-element">
   *
   * var qorusAuth = require("@qoretechnologies/qorus-toolkit")
   * const endpoint = await qorusAuth.initEndpoint('https://www.google.com','reppy');
   * </div>
   *
   */
  initEndpoint: (props: InitEndpoint) => Promise<Endpoint>;
  /**
   * Allows the user to select a endpoint from the endpoints array
   *
   * <script src="https://embed.runkit.com"  data-element-id="my-element"></script>
   * <h3>Example</h3>
   * <div id="my-element">
   *
   * var qorusAuth = require("@qoretechnologies/qorus-toolkit")
   * const endpoint = await qorusAuth.selectEndpoint('reppy');
   * </div>
   *
   */
  selectEndpoint: (id: string) => Promise<boolean>;
  /**
   * Returns the selected endpoint
   *
   * <script src="https://embed.runkit.com"  data-element-id="my-element"></script>
   * <h3>Example</h3>
   * <div id="my-element">
   *
   * var qorusAuth = require("@qoretechnologies/qorus-toolkit")
   * const endpoint = await qorusAuth.getSelectedEndpoint();
   * </div>
   *
   */
  getSelectedEndpoint: () => Endpoint | undefined;
  /**
   * Allows the user to renew the selected endpoint authentication token
   *
   * <script src="https://embed.runkit.com"  data-element-id="get-selected-endpoint"></script>
   * <h3>Example</h3>
   * <div id="get-selected-endpoint">
   *
   * var qorusAuth = require("@qoretechnologies/qorus-toolkit")
   * await qorusAuth.renewSelectedEndpointToken();
   * </div>
   *
   */
  renewSelectedEndpointToken: (props: LoginParams) => Promise<null>;
  /**
   * A getter to return the endpoint if exist in the endpoints array
   *
   * <script src="https://embed.runkit.com"  data-element-id="my-element"></script>
   * <h3>Example</h3>
   * <div id="my-element">
   *
   * var getJSON = require("@qoretechnologies/qorus-toolkit")
   * const endpoint = qorusAuth.getEndpointById();
   * console.log(endpoint);
   * </div>
   *
   */
  getEndpointById: (id: string) => Endpoint | undefined;
  /**A setter to set the url of the selected endpoint */
  /**
   * A setter to set the url of the selected endpoint
   *
   * <script src="https://embed.runkit.com"  data-element-id="c"></script>
   * <h3>Example</h3>
   * <div id="setEndpointUrl">
   *
   * var getJSON = require("@qoretechnologies/qorus-toolkit")
   * const endpoint = qorusAuth.setEndpointUrl('google.com','reppy');
   * console.log(endpoint);
   * </div>
   *
   */
  setEndpointUrl: (url: string, id?: string) => Promise<null>;
  /**A setter to edit the version of the endpoint */
  setEndpointVersion: (version: Version, id?: string) => Promise<null>;
  /**A getter to return the auth token of the selected endpoint */
  getAuthToken: () => string | undefined;
  //**A getter to get the api version of a endpoint */
  getEndpointVersion: (id?: string) => Version | undefined;
  //**A getter to return the api paths for the selected endpoint */
  getApiPaths: () => ApiPaths;
  //**A getter to get all the availaible endpoints */
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
 * @example
 * ```ts
 * QorusAuth.init({url: "https://url of the instance", id: "reppy"});
 * const selectedEndpoint = QorusAuth.getSelectedEndpoint();
 * QorusAuth.login({user: 'username', pass: 'pass'});
 * QorusAuth.logout();
 * ```
 *
 * @Category QorusAuthenticator
 */
const _QorusAuthenticator = (): Authenticator => {
  //**Array of user defined endpoints */
  const endpoints: Endpoint[] = [];

  /**Api paths for the selected endpoint */
  let apiPaths: ApiPaths = apiPathsInitial;

  /**Selected endpoint from the endpoints array */
  let selectedEndpoint: Endpoint;

  let noauth: boolean = false;

  /**
   * A getter to return the endpoint if exist in the endpoints array
   * @param id of the endpoint
   * @returns endpoint if found else returs undefined
   *
   * @example
   * ```ts
   * const endpoint = getEndpointById();
   * console.log(endpoint);
   * ```
   */
  const getEndpointById = (id: string): Endpoint | undefined => {
    return endpoints.find((endpoint) => endpoint.id === id);
  };

  /**
   * Logs out the current user from the selected endpoint
   *
   * @example
   * ```ts
   * logout();
   * ```
   */
  const logout = async (): Promise<void> => {
    if (selectedEndpoint) {
      selectedEndpoint.authToken = undefined;
      apiPaths = apiPathsInitial;
      noauth = false;

      try {
        await QorusReq.post({ endpointUrl: `${selectedEndpoint.url}${apiPaths.logout}` });
      } catch (error: any) {
        logger.log({
          level: 'error',
          message: `Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`,
        });
      }
    }
  };

  /**
   * Allows the user to select a endpoint from the endpoints array,
   * Logs out the user from the current selected endpoint
   *
   * @param id id of the endpoint to be selected
   * @returns True if the endpoint is selected successfully False otherwise
   */
  const selectEndpoint = async (id: string): Promise<boolean> => {
    const endpoint = getEndpointById(id);
    if (endpoint && endpoint.url) {
      if (selectedEndpoint.authToken) {
        await logout();
      }

      selectedEndpoint = endpoint;
      apiPaths = createApiPaths({ version: endpoint.version });

      return true;
    }
    return false;
  };

  const checkNoAuth = async (url: string): Promise<null> => {
    let resp;

    try {
      resp = await QorusReq.get({ endpointUrl: `${url}${apiPaths.validateNoAuth}` });
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
   *
   * @param props id and url is required to initialize a new endpoint with default 'latest' version
   * @returns A new endpoint, select it as selected endpoint and adds it to the endpoints array
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
   *
   * @returns Selected Endpoint
   */
  const getSelectedEndpoint = (): Endpoint | undefined => {
    return selectedEndpoint;
  };

  /**
   * Validates the local stored authentication token for the endpoint
   *
   * @param endpointId d of the endpoint to renew the auth token
   * @returns Promise that returns auth token if it's valid, invalid if the token is expired and null if there is no auth token stored in the local storage
   */
  const validateLocalUserToken = async (endpointId: string): Promise<string | 'invalid' | null> => {
    const authToken = getKeyValLocal(`auth-token-${endpointId}`);

    if (authToken) {
      try {
        const resp = await QorusReq.get({
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
   * @param loginConfig username and password is required to login the user
   * @returns Authentication token for the user
   * @error throws an error if the provided credentials are invalid
   */
  const login = async (loginConfig: LoginParams): Promise<string | undefined> => {
    if (!noauth) {
      const { user, pass } = loginConfig;
      const { id } = selectedEndpoint;

      if (!(user && pass)) {
        logger.log({ level: 'error', message: 'Authentication is required with Username and Password' });

        return undefined;
      }

      const currentUserToken = await validateLocalUserToken(id);

      if (currentUserToken && currentUserToken !== 'invalid') {
        selectedEndpoint.authToken = currentUserToken;
        return currentUserToken;
      } else
        try {
          const resp = await QorusReq.post({
            endpointUrl: `${selectedEndpoint.url}${apiPaths.login}`,
            data: { user, pass },
          });
          const authToken = resp.data;

          selectedEndpoint.authToken = authToken;
          setKeyValLocal({ key: `auth-token-${id}`, value: authToken });

          return authToken;
        } catch (error: any) {
          logger.log({ level: 'error', message: `Couldn't sign in user ${error.statusCode} ${error.message}` });
        }
    }

    return undefined;
  };

  /**
   * Allows the user to renew the selected endpoint authentication token
   *
   * @param props Username and Password of the the user
   */
  const renewSelectedEndpointToken = async (props: LoginParams): Promise<null> => {
    const { user, pass } = props;

    if (selectedEndpoint) {
      await login({ user, pass });
    }

    return null;
  };

  /**
   * A getter to return the auth token of the selected endpoint
   *
   * @returns Authentication token for the selected endpoint
   */
  const getAuthToken = (): string | undefined => {
    return selectedEndpoint.authToken;
  };

  /**
   * A getter to get the api version of a endpoint
   *
   * @param id Optional id parameter to get the version of a certain endpoint
   * @returns Version of the selected endpoint if the id parameter is not provided otherwise returns the version of a certain endpoint
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
   *
   * @param props version is required to set a new version of the selected endpoint. Optional id can be supplied to change the version of a specific endpoint
   * @returns true if the version change is successful false otherwise
   */
  const setEndpointVersion = async (version: Version, id: string = selectedEndpoint.id): Promise<null> => {
    if (id) {
      const endpoint = getEndpointById(id);

      if (endpoint) {
        endpoints[endpoints.indexOf(endpoint)].version = version;

        if (selectedEndpoint.id === endpoint.id) {
          selectedEndpoint.version = version;
          apiPaths = createApiPaths({ version });
        }

        await logout();
        logger.log({ level: 'info', message: 'Changed endpoint version successfully.' });
        return null;
      }

      logger.log({ level: 'info', message: 'enpoint does not exist, please try again.' });
      return null;
    }

    logger.log({ level: 'info', message: 'id is required to change the version of a endpoint.' });
    return null;
  };

  /**
   * A setter to set the url of the selected endpoint
   *
   * @param props url is required to change the url of the selected endpoint. Option id parameter can be provided to change the url of a specific endpoint
   * @returns true if the url change is successful, false otherwise
   */
  const setEndpointUrl = async (url: string, id: string = selectedEndpoint.id): Promise<null> => {
    if (id) {
      const endpoint = getEndpointById(id);

      if (endpoint) {
        endpoints[endpoints.indexOf(endpoint)].url = url;

        if (selectedEndpoint.id === endpoint.id) {
          selectedEndpoint.url = url;
        }

        await logout();
        logger.log({ level: 'info', message: 'Changed endpoint url successfully.' });
        return null;
      }

      logger.log({ level: 'info', message: 'enpoint does not exist, please try again.' });
      return null;
    }

    logger.log({ level: 'info', message: 'id is required to change the url of a endpoint.' });
    return null;
  };

  /**
   * A getter to return the api paths for the selected endpoint
   *
   * @returns api paths for the selected endpoint
   */
  const getApiPaths = (): ApiPaths => {
    return apiPaths;
  };

  /**
   * A getter to get all the availaible endpoints
   *
   * @returns endpoints array with the current config
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
