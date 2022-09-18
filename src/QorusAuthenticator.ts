import { getKeyValLocal, setKeyValLocal } from './managers/LocalStorage';
import logger from './managers/logger';
import { ApiPaths, apiPathsInitial, createApiPaths, Version } from './utils/apiPaths';
import { QorusReq } from './utils/QorusRequest';

export interface Authenticator {
  /**
   * Enable the user to login to the selected endpoint
   * @param loginConfig login params of the user {@link LoginParams}
   *
   * Login function takes optional username and password parameters to authenticate the user.
   * If the username and password is not provided it tries to authenticate using the locally stored token from the selected endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="login-elem"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("login-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;\n
   * //Initialize the endpoint before authentication
   * const endpoint = QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * const { token } = await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });
   * console.log(token);`
   * })</script>
   */
  login: (loginConfig: LoginParams) => Promise<string | undefined>;

  /**
   * Logs out the current user from the selected endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="logout-elem"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("logout-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;\n
   * // Logs out the user
   * await QorusAuthenticator.logout();`
   * })</script>
   */
  logout: () => Promise<void>;

  /**
   * Allows the user to add/initialize a new endpoint
   * @param props id and url are the mandatory parameters for initializing an endpoint {@link InitEndpoint}
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="init-endpoint"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("init-endpoint"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;\n
   * // Initializes a new endpoint and returns it
   * const endpoint = await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * console.log(endpoint);`
   * })</script>
   */
  initEndpoint: (props: InitEndpoint) => Promise<Endpoint>;

  /**
   * Allows the user to select a endpoint from the endpoints array, logout the user from the current
   * selected endpoint\
   * @param id Id of the endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="select-endpoint"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("select-endpoint"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Changes selected endpoint and return true if selected
   * const endpoint = await QorusAuthenticator.selectEndpoint('reppy');
   * console.log(endpoint);`
   * })</script>
   */
  selectEndpoint: (id: string) => Promise<boolean>;

  /**
   * Returns the selected endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="get-selected-endpoint"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-selected-endpoint"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Returns selected endpoint
   * const endpoint = await QorusAuthenticator.getSelectedEndpoint();
   * console.log(endpoint);`
   * })</script>
   */
  getSelectedEndpoint: () => Endpoint | undefined;

  /**
   * Allows the user to renew the selected endpoint authentication token
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="renew-token"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("renew-token"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;\n
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Renews auth-token for the selected endpoint
   * const token = await QorusAuthenticator.renewSelectedEndpointToken({ user: 'rmalik', pass: 'rmalik1234' });
   * console.log(token);`
   * })</script>
   */
  renewSelectedEndpointToken: (props: LoginParams) => Promise<null>;

  /**
   * A getter to return the endpoint if exist in the endpoints array
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="get-endpoint-by-id"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-endpoint-by-id"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Returns the endpoint if exists in the endpoints array
   * const endpoint = await QorusAuthenticator.getEndpointById('reppy');
   * console.log(endpoint);`
   * })</script>
   */
  getEndpointById: (id: string) => Endpoint | undefined;

  /** A setter to set the url of the selected endpoint
   * @param url Base url for the endpoint
   * @param id Optional id parameter to change the url of a particular endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="set-endpoint-by-id"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("set-endpoint-by-id"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * await QorusAuthenticator.setEndpointUrl('https://www.google.com','reppy');
   * const endpoint = QorusAuthenticator.getSelectedEndpoint();
   * console.log(endpoint);`
   * })</script>
   */
  setEndpointUrl: (url: string, id?: string) => Promise<null>;

  /** A setter to edit the version of the endpoint
   * @param version Version of the qorus api {@link Version}
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="set-endpoint-ver"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("set-endpoint-ver"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * await QorusAuthenticator.setEndpointVersion('https://www.google.com','reppy');
   * const endpoint = QorusAuthenticator.getSelectedEndpoint();
   * console.log(endpoint);`
   * })</script>
   */
  setEndpointVersion: (version: Version, id?: string) => Promise<null>;

  /** A getter to return the auth token of the selected endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="get-auth-token"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-auth-token"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });\n
   * const token = QorusAuthenticator.getAuthToken();
   * console.log(token);`
   * })</script>
   */
  getAuthToken: () => string | undefined;

  /**
   * A getter to get the api version of a endpoint
   * @param id Optional id parameter to return the version of a particular endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="get-endpoint-ver"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-endpoint-ver"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * const version = QorusAuthenticator.getEndpointVersion();
   * console.log(version);`
   * })</script>
   */
  getEndpointVersion: (id?: string) => Version | undefined;

  /**
   * A getter to return the api paths for the selected endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="get-api-paths"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-api-paths"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * const apiPaths = QorusAuthenticator.getApiPaths();
   * console.log(apiPaths);`
   * })</script>
   */
  getApiPaths: () => ApiPaths;

  /**
   * A getter to get all the available endpoints
   *
   * <script src="https://embed.runkit.com"></script>
   * <h3>Example</h3>
   * <div id="get-all-endpoints"></div>
   * <script>var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-all-endpoints"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'reppy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * const endpoints = QorusAuthenticator.getAllEndpoints();
   * console.log(endpoints);`
   * })</script>
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

  let noauth = false;

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
   * A getter to get all the available endpoints
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
