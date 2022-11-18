import { getKeyValLocal, setKeyValLocal } from './managers/LocalStorage';
import logger, { errorTypes } from './managers/logger';
import { ApiPaths, apiPathsInitial, createApiPaths, Version, WithEndpointVersion } from './utils/apiPaths';
import QorusRequest from './QorusRequest';
import { AxiosError, AxiosResponse } from 'axios';

export type QorusEndpointId = string;
export type QorusAuthToken = string;
export type QorusEndpointURL = string;

export interface WithQorusEndpointId {
  /**
   * Id for the {@link Endpoint} provided by the user, unique for every endpoint
   */
  id: QorusEndpointId;
}

export interface WithQorusAuthToken {
  /**
   * Auth token for the user provided {@link Endpoint}
   */
  authToken?: QorusAuthToken;
}

export interface WithQorusURL {
  /**
   * URL to your server for the provided {@link Endpoint}
   */
  url: QorusEndpointURL;
}

export interface LoginParams {
  /**
   * Username for the authentication to your server
   */
  user?: string;
  /**
   * Password for the authentication to your server
   */
  pass?: string;
}

export interface InitEndpoint extends WithQorusURL, WithEndpointVersion, WithQorusEndpointId, LoginParams {}

export interface Endpoint extends WithQorusURL, WithEndpointVersion, WithQorusAuthToken, WithQorusEndpointId {}

export type Token = string;

/**
 * Enables the user to authenticate with multiple user defined endpoints
 * @returns QorusAuthenticator object with all the supporting operations
 * @Category QorusAuthenticator
 */
export class QorusAuthenticator {
  //** Array of user defined endpoints */
  endpoints: Endpoint[] = [];

  /** All Api paths for the selected endpoint */
  allApiPaths: ApiPaths = apiPathsInitial;

  apiPathsAuthenticator: ApiPaths['authenticator'] = apiPathsInitial.authenticator;

  /** Selected endpoint from the endpoints array */
  selectedEndpoint: Endpoint | undefined;

  noauth = false;

  /**
   * -getEndpointById-function A getter to return the endpoint if it exist in the endpoints array
   *
   * @param id ID of the endpoint ex: "rippy"
   *
   * Returns the endpoint {@link Endpoint} if the endpoint with the supplied id exist in the endpoints array, undefined otherwise.
   */
  getEndpointById = (id: string): Endpoint | undefined => {
    return this.endpoints.find((endpoint) => endpoint.id === id);
  };

  /**
   * -logout-function Logs out the current user from the selected endpoint
   *
   */
  logout = async (callback?: (err?: Error, result?: boolean) => void): Promise<boolean> => {
    if (!this.selectedEndpoint || !this.selectedEndpoint.authToken) {
      if (callback)
        callback({ name: errorTypes.generalAuthenticatorError, message: 'Selected endpoint is not defined' }, false);
      return true;
    }

    try {
      await QorusRequest.post({ path: `${this.apiPathsAuthenticator.logout}` });

      this.selectedEndpoint.authToken = undefined;
      this.allApiPaths = apiPathsInitial;
      this.apiPathsAuthenticator = apiPathsInitial.authenticator;
      this.noauth = false;
      if (callback) callback(undefined, true);
      return true;
    } catch (error: any) {
      logger.error(`Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      if (callback) callback({ name: errorTypes.generalAuthenticatorError, message: error });
      return false;
    }
  };

  /**
   * -selectEndpoint-function Allows the user to select a endpoint from the endpoints array, logout the user from the current
   * selected endpoint
   *
   * @param id Id of the endpoint
   *
   * Returns endpoint if the operation is successful false otherwise.
   */
  selectEndpoint = async (
    id: string,
    callback?: (err?: Error, result?: Endpoint) => void,
  ): Promise<Endpoint | undefined> => {
    const endpoint = this.getEndpointById(id);

    if (!endpoint || !endpoint.url) {
      if (callback)
        callback(
          {
            name: errorTypes.generalAuthenticatorError,
            message: `Cannot find endpoint with id "${id}", please provide a valid id`,
          },
          undefined,
        );
      return undefined;
    }
    if (this.selectedEndpoint?.authToken) {
      await this.logout();
    }

    this.selectedEndpoint = endpoint;
    this.allApiPaths = createApiPaths({ version: endpoint.version });
    this.apiPathsAuthenticator = this.allApiPaths.authenticator;

    if (callback) callback(undefined, endpoint);
    return endpoint;
  };

  // Check if the server has noauth enabled
  checkNoAuth = async (callback?: (err?: Error, result?: boolean) => void): Promise<boolean> => {
    let resp;

    try {
      resp = await QorusRequest.get({ path: `${this.apiPathsAuthenticator.validateNoAuth}` });
      const _noauth = resp.data.noauth;

      if (typeof _noauth === 'boolean' && _noauth === true) {
        this.noauth = _noauth;
        console.log('No auth enabled, authentication not required');
        if (callback) callback(undefined, true);
        return true;
      }
      this.noauth = false;
      return false;
    } catch (error: any) {
      logger.error(`Couldn't check the noauth status: ${error}`);

      if (callback)
        callback(
          { name: errorTypes.authenticationError, message: `Couldn't check the noauth status: ${error}` },
          undefined,
        );
      return false;
    }
  };

  /**
   * -getSelectedEndpoint-function A getter to return selected {@link Endpoint}
   *
   * Returns the selected endpoint if it's created or returns undefined
   */
  getSelectedEndpoint = (): Endpoint | undefined => {
    return this.selectedEndpoint;
  };

  /**
   * Validates the local stored authentication token for the endpoint
   */
  validateLocalUserToken = async (
    endpointId: string,
    callback?: (err?: Error, result?: Token) => void,
  ): Promise<string | undefined> => {
    const authToken = getKeyValLocal(`auth-token-${endpointId}`);

    if (!authToken) {
      if (callback)
        callback(
          {
            name: errorTypes.invalidAuthenticationToken,
            message: 'Auth token for the endpoint does not exist in local storage',
          },
          undefined,
        );

      return undefined;
    }

    try {
      const resp = await QorusRequest.get({
        path: `${this.apiPathsAuthenticator.validateToken}`,
        data: { token: authToken },
      });

      if (typeof resp === 'string') {
        if (callback) callback(undefined, authToken);

        return authToken;
      } else {
        if (callback)
          callback(
            { name: errorTypes.invalidAuthenticationToken, message: 'Authentication token is not valid' },
            undefined,
          );
        return undefined;
      }
    } catch (error: any) {
      if (callback) callback({ name: errorTypes.invalidAuthenticationToken, message: error }, undefined);
      return undefined;
    }
  };

  /**
   * -login-function Takes optional username and password parameters to authenticate the user.
   If the username and password is not provided it tries to authenticate using the locally stored token from the selected {@link Endpoint}

   * token if the authentication is successful else returns undefined
   */
  login = async (
    loginConfig?: LoginParams,
    callback?: (err?: Error, result?: Token) => void,
  ): Promise<string | undefined> => {
    if (!this.noauth) {
      const user = loginConfig?.user;
      const pass = loginConfig?.pass;
      const { id } = this.selectedEndpoint!;
      const currentUserToken = await this.validateLocalUserToken(id);

      if (!(user && pass) && !currentUserToken) {
        logger.error('Authentication is required with Username and Password');

        if (callback)
          callback(
            { name: errorTypes.authenticationError, message: 'Authentication is required with Username and Password' },
            undefined,
          );
        return undefined;
      }

      if (currentUserToken && currentUserToken !== 'invalid' && this.selectedEndpoint) {
        this.selectedEndpoint.authToken = currentUserToken;
        if (callback) callback(undefined, currentUserToken);
        return currentUserToken;
      }

      const resp = await QorusRequest.post({
        path: `${this.apiPathsAuthenticator.login}`,
        data: { user, pass },
      });
      const responseData = resp as AxiosResponse;
      const error = resp as unknown as AxiosError;
      if (error?.code) {
        logger.error(`Couldn't sign in user ${error.code} ${error.message}`);
        if (callback)
          callback(
            { name: errorTypes.authenticationError, message: `Couldn't sign in user ${error.code} ${error.message}` },
            undefined,
          );
        return undefined;
      }
      const { token }: { token: string } = responseData?.data;
      if (this.selectedEndpoint) this.selectedEndpoint.authToken = token;
      setKeyValLocal({ key: `auth-token-${id}`, value: token });
      if (callback) callback(undefined, token);
      return token;
    }

    if (callback) callback(undefined, 'No auth enabled, user authenticated');
    return undefined;
  };

  /**
   * -initEndpoint-function Allows the user to add/initialize a new endpoint
   * @param props {@link InitEndpoint} requires url and accepts optional user and pass parameters to initialize the endpoint and then authenticate the user
   *
   * Returns the newly created endpoint
   */
  initEndpoint = async (
    endpointConfig: InitEndpoint,
    callback?: (err?: Error, result?: Endpoint) => void,
  ): Promise<Endpoint | undefined> => {
    const { id, url, version, user, pass } = endpointConfig;

    if (!id || id === '' || !url || url === '') {
      if (callback)
        callback(
          { name: errorTypes.generalAuthenticatorError, message: 'Id and url is required to initialize an endpoint' },
          undefined,
        );

      return undefined;
    }
    const newEndpoint: Endpoint = {
      ...endpointConfig,
      version: version ?? 'latest',
    };
    const storedEndpoint = this.getEndpointById(id);

    if (!storedEndpoint) {
      this.endpoints.push(newEndpoint);
    }

    if (this.selectedEndpoint) {
      await this.selectEndpoint(id);
    } else {
      this.selectedEndpoint = newEndpoint;
    }

    await this.checkNoAuth();
    if (user && pass) await this.login({ user, pass });

    if (callback) callback(undefined, this.selectedEndpoint);
    return this.selectedEndpoint;
  };

  /**
   * -renewSelectedEndpointToken-function Allows the user to renew the selected endpoint authentication token
   *
   * @param props {@link LoginParams} optional username and password can be provided
   * Returns token if the authentication is successful, undefined otherwise
   */
  renewSelectedEndpointToken = async (
    loginParams: LoginParams,
    callback?: (err?: Error, result?: any) => void,
  ): Promise<string | undefined> => {
    const { user, pass } = loginParams;
    if (!this.selectedEndpoint || !(user && pass)) {
      if (callback)
        callback(
          {
            name: errorTypes.authenticationError,
            message: 'Username and password is required to revalidate the authentication token',
          },
          undefined,
        );
      return undefined;
    }

    const token = await this.login({ user, pass });
    if (typeof token === 'string') {
      if (callback) callback(undefined, token);
      return token;
    }

    if (callback)
      callback(
        {
          name: errorTypes.authenticationError,
          message: 'Username and password is required to revalidate the authentication token',
        },
        undefined,
      );
    return undefined;
  };

  /**
   * -getAuthToken-function A getter to return the auth token of the selected {@link Endpoint}
   *
   * Returns token if the the selected endpoint exists and the user is authenticated, otherwise returns undefined
   */
  getAuthToken = (): string | undefined => {
    return this.selectedEndpoint?.authToken;
  };

  /**
   * -getEndpointVersion-function A getter to get the api {@link Version} of a {@link Endpoint}
   *
   * @param id Optional id parameter to get the version of a particular endpoint
   *
   * Returns version of the selected endpoint or version of the the endpoint found by id,
   * if the endpoint doesn't exists it returns undefined
   */
  getEndpointVersion = (id?: string): Version | undefined => {
    if (id) {
      return this.getEndpointById(id)?.version;
    } else {
      if (this.selectedEndpoint) {
        return this.selectedEndpoint.version;
      }
    }

    return undefined;
  };

  private validateVersion = (version: number | string) => {
    const versions = [1, 2, 3, 4, 5, 6, 'latest'];
    return versions.includes(version);
  };

  /** -setEndpointVersion-function A setter to edit the {@link Version} of the {@link Endpoint}
   * @param version Version of the qorus api
   * @param id Optional id parameter to change the url of a particular endpoint from the endpoints array
   *
   * Returns version of the endpoint if the operation is successful, undefined otherwise
   *
   */
  setEndpointVersion = async (version: Version, id?: string): Promise<Version | undefined> => {
    if (!id) id = this.selectedEndpoint?.id;
    if (id && this.validateVersion(version)) {
      const endpoint = this.getEndpointById(id);

      if (endpoint && endpoint.id && endpoint.version) {
        this.endpoints[this.endpoints.indexOf(endpoint)].version = version;

        if (this.selectedEndpoint && this.selectedEndpoint.id === endpoint.id) {
          this.selectedEndpoint.version = version;
          this.allApiPaths = createApiPaths({ version });
          this.apiPathsAuthenticator = this.allApiPaths.authenticator;
          await this.logout();
        }

        logger.log('Changed endpoint version successfully.');
        return version;
      }

      logger.error('endpoint does not exist, please try again.');
      return undefined;
    }

    logger.error('id and a valid version is required to change the version of a endpoint.');
    return undefined;
  };

  /**
   * -setEndpointUrl-function A setter to set the url of the selected {@link Endpoint}
   * @param url Base url for the endpoint
   * @param id Optional id parameter to change the url of a particular endpoint
   *
   * Returns url of the endpoint if the operation is successful, undefined otherwise
   */
  setEndpointUrl = async (url: string, id?: string): Promise<string | undefined> => {
    if (!id) id = this.selectedEndpoint?.id;
    if (id) {
      const endpoint = this.getEndpointById(id);

      if (endpoint && endpoint.id && endpoint.url) {
        this.endpoints[this.endpoints.indexOf(endpoint)].url = url;

        if (this.selectedEndpoint && this.selectedEndpoint.id === endpoint.id) {
          this.selectedEndpoint.url = url;
          await this.logout();
        }

        logger.log('Changed endpoint url successfully.');
        return url;
      }

      logger.error('enpoint does not exist, please try again.');
      return undefined;
    }

    logger.error('id is required to change the url of a endpoint.');
    return undefined;
  };

  /**
   * -getApiPaths-function A getter to return the api paths for the selected {@link Endpoint}
   *
   * Returns ApiPaths for the selected endpoint if exists, otherwise returns default api paths
   */
  getApiPaths = (): ApiPaths => {
    return this.allApiPaths;
  };

  /**
   * -getAllEndpoints-function A getter to get all the available {@link Endpoint}
   *
   * Returns endpoints array with all the available endpoints
   */
  getAllEndpoints = (): Endpoint[] => {
    return this.endpoints;
  };
}

export default new QorusAuthenticator();
