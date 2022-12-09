import { AxiosResponse } from 'axios';
import ErrorInternal from './managers/error/ErrorInternal';
import { getKeyValLocal, setKeyValLocal } from './managers/LocalStorage';
import logger from './managers/logger';
import QorusRequest from './QorusRequest';
import QorusValidator from './QorusValidator';
import { isValidString, isValidStringArray } from './utils';
import { ApiPaths, apiPathsInitial, createApiPaths, Version, WithEndpointVersion } from './utils/apiPaths';

export type QorusEndpointId = string;
export type QorusAuthToken = string;
export type QorusEndpointURL = string;

export interface WithQorusEndpointId {
  /**
   * Id for the endpoint provided by the user, unique for every endpoint
   */
  id: QorusEndpointId;
}

export interface WithQorusAuthToken {
  /**
   * Auth token for the user provided endpoint
   */
  authToken?: QorusAuthToken;
}

export interface WithQorusURL {
  /**
   * URL to your server for the provided endpoint
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

export interface AddEndpoint extends WithQorusURL, WithEndpointVersion, WithQorusEndpointId {}

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
   * A getter to get the endpoint if it exist in the Endpoints array
   * @param id ID of the endpoint ex: "rippy"
   * @returns Endpoint if the endpoint with the provided id exist in the endpoints array, undefined otherwise.
   */
  getEndpointById = (id: string): Endpoint | undefined => {
    return this.endpoints.find((endpoint) => endpoint.id === id);
  };

  /**
   * Logs out the current user from the selected endpoint
   * @returns True if the operation is successful, False otherwise
   */
  logout = async (): Promise<boolean> => {
    if (!this.selectedEndpoint || !isValidString(this.selectedEndpoint.authToken)) {
      return true;
    }

    try {
      await QorusRequest.post({ path: `${this.apiPathsAuthenticator.logout}` });
      return true;
    } catch (error: any) {
      throw new ErrorInternal(`Unable to logout user from the endpoint ${this.selectedEndpoint}`);
    } finally {
      this.selectedEndpoint.authToken = undefined;
      this.allApiPaths = apiPathsInitial;
      this.apiPathsAuthenticator = apiPathsInitial.authenticator;
      this.noauth = false;
    }
  };

  /**
   * Select an endpoint from the available Endpoints array
   * selected endpoint
   * @param id Id of the endpoint
   * @returns Endpoint if the operation is successful, false otherwise.
   */
  selectEndpoint = async (id: string): Promise<Endpoint | undefined> => {
    if (!isValidString(id)) {
      throw new ErrorInternal('Id is not valid, please provide a valid id or initialize a new endpoint.');
    }

    const endpoint = this.getEndpointById(id);
    if (!endpoint || !isValidString(endpoint.url)) {
      throw new ErrorInternal('Selected endpoint is not valid, please create a new endpoint.');
    }

    if (this.selectedEndpoint?.authToken) {
      await this.logout();
    }

    this.selectedEndpoint = endpoint;
    this.allApiPaths = createApiPaths({ version: endpoint.version });
    this.apiPathsAuthenticator = this.allApiPaths.authenticator;

    return endpoint;
  };

  /**
   * Checks if the Qorus endpoint supports no-auth
   * @param endpoint Endpoint config to add the data
   * @returns True if the no-auth is enabled for the user, False otherwise
   */
  checkNoAuth = async (endpoint?: Endpoint): Promise<boolean> => {
    const actualEndpoint = endpoint ?? this.selectedEndpoint;

    /* Throwing an error if the actualEndpoint is not defined. */
    if (!actualEndpoint) {
      throw new ErrorInternal('No endpoint selected, please select an endpoint.');
    }

    /* Trying to connect to the endpoint and check if the endpoint is using noauth. */
    try {
      const resp = await QorusRequest.get<{ data: { noauth: boolean } }>(
        { path: `${this.apiPathsAuthenticator.validateNoAuth}` },
        endpoint,
      );
      if (!resp?.data) {
        throw new ErrorInternal(
          `Cannot verify no-auth please check your url "${endpoint?.url ?? this.selectedEndpoint?.url}" and try again`,
        );
      }

      if (!resp.data.noauth) {
        this.noauth = false;
        console.log('No auth disabled, authentication is required with username and password');
        return false;
      }

      if (resp.data.noauth) {
        this.noauth = resp.data.noauth;
        console.log('No auth enabled, authentication not required');
        return true;
      }

      this.noauth = false;

      return false;
    } catch (error: any) {
      throw new ErrorInternal(
        `Unable to connect to ${actualEndpoint.url}, please check the url / connection and try again. ${
          error ? JSON.stringify(error) : ''
        }`,
      );
    }
  };

  /**
   * A getter to get selected Endpoint
   * @returns Selected Endpoint if the endpoint exists, undefined otherwise
   */
  getSelectedEndpoint = (): Endpoint | undefined => {
    return this.selectedEndpoint;
  };

  /**
   * Fixed the endpoint data
   * @param data AddEndpoint, data to be fixed
   * @returns Fixed Endpoint config
   */
  #fixEndpointData(data: AddEndpoint): AddEndpoint & LoginParams {
    const newData = { ...data };

    if (!newData.version) {
      newData.version = 'latest';
    }

    return newData;
  }

  /**
   * Checks the validity of the selected endpoint
   * @param data {@link AddEndpoint} to be checked
   * @param withCredentials boolean to check if the endpoint has credentials
   * @returns True if the the Endpoint data is valid, False otherwise
   */
  validateEndpointData = (data: AddEndpoint & LoginParams, withCredentials?: boolean): boolean => {
    let valid = true;
    const fixedData = this.#fixEndpointData(data);

    if (
      !(
        QorusValidator.validate('string', fixedData.id) &&
        QorusValidator.validate('string', fixedData.url) &&
        QorusValidator.validate('version', fixedData.version)
      )
    ) {
      valid = false;
    }

    if (
      withCredentials &&
      !(QorusValidator.validate('string', fixedData.user) && QorusValidator.validate('string', fixedData.pass))
    ) {
      valid = false;
    }

    return valid;
  };

  /**
   * Validates the local stored authentication token for the Endpoint
   * @param endpointId Id of the endpoint
   * @returns Authentication token, if the authentication is successful, null otherwise
   */
  validateLocalUserToken = async (endpointId: string): Promise<string | null> => {
    const authToken = getKeyValLocal(`auth-token-${endpointId}`);

    if (!isValidString(authToken)) {
      return null;
    }

    try {
      const resp = await QorusRequest.get({
        path: `${this.apiPathsAuthenticator.validateToken}`,
        data: { token: authToken },
      });

      if (typeof resp === 'string') {
        return authToken;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  };

  /**
   * Authenticate user to interact with the Qorus api.
   * If the username and password is not provided it tries to authenticate using the locally stored token from the selected Endpoint
   * @param loginParams LoginParams, user and pass is required to authenticate the user.
   * @returns Authentication token if the authentication is successful, undefined otherwise.
   */
  login = async (loginParams?: LoginParams): Promise<string | undefined> => {
    await this.checkNoAuth();
    if (this.noauth) {
      logger.log('No-auth enabled authentication not required.');
      return undefined;
    }
    if (!this.selectedEndpoint || !isValidString(this.selectedEndpoint.url)) {
      throw new ErrorInternal('Endpoint must be initialized before authentication.');
    }
    if (!isValidStringArray([loginParams?.user, loginParams?.pass])) {
      throw new ErrorInternal('Username and password is required for authentication');
    }

    const user = loginParams?.user ?? undefined;
    const pass = loginParams?.pass ?? undefined;
    const { id } = this.selectedEndpoint;
    const currentUserToken = await this.validateLocalUserToken(id);

    if (currentUserToken && currentUserToken !== 'invalid' && this.selectedEndpoint) {
      this.selectedEndpoint.authToken = currentUserToken;
      return currentUserToken;
    }

    const resp = await QorusRequest.post({
      path: `${this.apiPathsAuthenticator.login}`,
      data: { user, pass },
    });
    const responseData = resp as AxiosResponse;
    if (typeof responseData.data === 'undefined') {
      throw new ErrorInternal(`${responseData}`);
    }
    const { token } = responseData?.data ?? null;
    if (!token) {
      throw new Error('There was an error authenticating user, token is invalid, please try again.');
    }

    this.selectedEndpoint.authToken = token;
    setKeyValLocal({ key: `auth-token-${id}`, value: token });
    return token;
  };

  /**
   * Add a new Qorus Endpoint to interact with the qorus api.
   * @param endpointConfig AddEndpoint requires url and accepts optional user and pass parameters to initialize the endpoint and then authenticate the user
   * @returns Endpoint
   */
  addEndpoint = (endpointConfig: AddEndpoint): Endpoint => {
    const { id, url } = endpointConfig;
    const newEndpoint: Endpoint = this.#fixEndpointData(endpointConfig);

    /* Checking if the id and url are valid strings. */
    if (!isValidStringArray([id, url])) {
      throw new ErrorInternal('Id and url is required to initialize an endpoint');
    }

    /* Checking if the endpoint already exists. */
    if (this.getEndpointById(id)) {
      throw new ErrorInternal(`Endpoint with the id "${id}" already exists, please try again with a different id`);
    }

    /* Adding a new endpoint to the endpoints array. */
    this.endpoints.push(newEndpoint);
    this.selectedEndpoint = newEndpoint;

    return this.selectedEndpoint;
  };

  /**
   * Allows the user to renew the selected endpoint authentication token
   * @param loginParams LoginParams optional username and password can be provided
   * @returns Token if the authentication is successful, undefined otherwise
   */
  renewSelectedEndpointToken = async (loginParams: LoginParams): Promise<string | undefined> => {
    const { user, pass } = loginParams;
    if (!this.selectedEndpoint || !isValidString(this.selectedEndpoint.url)) {
      console.error(new ErrorInternal('Endpoint is not selected, please initialize an endpoint to renew token'));
      return undefined;
    }
    if (!isValidStringArray([user, pass])) {
      throw new ErrorInternal('Username and password is required to revalidate endpoint token.');
    }

    const token = await this.login({ user, pass });
    if (isValidString(token)) {
      this.selectedEndpoint.authToken = token;
      return token;
    }

    console.error(new ErrorInternal('Username and password are not valid, please try again'));
    return undefined;
  };

  /**
   * A getter to return the auth token of the selected Endpoint
   * @returns token if the the selected endpoint exists and the user is authenticated, otherwise returns undefined
   */
  getAuthToken = (): string | undefined => {
    return this.selectedEndpoint?.authToken;
  };

  /**
   * A getter to get the api {@link Version} of a {@link Endpoint}
   * @param endpointId Optional id parameter to get the version of a particular endpoint
   * @returns Version of the selected endpoint or version of the the endpoint found by id,
   * if the endpoint doesn't exists it returns undefined
   */
  getEndpointVersion = (endpointId?: string): Version | undefined => {
    if (isValidString(endpointId)) {
      return this.getEndpointById(endpointId!)?.version;
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

  /**
   * A setter to set the Version of the Endpoint
   * @param version Version of the qorus api
   * @param endpointId Optional id parameter to change the url of a particular endpoint from the endpoints array
   * @returns Version of the endpoint if the operation is successful, undefined otherwise
   *
   */
  setEndpointVersion = async (version: Version, endpointId?: string): Promise<Version | undefined> => {
    if (!endpointId) endpointId = this.selectedEndpoint?.id;
    if (isValidString(endpointId) && this.validateVersion(version)) {
      const endpoint = this.getEndpointById(endpointId!);
      await this.logout();

      if (endpoint && isValidString(endpoint.url)) {
        this.endpoints[this.endpoints.indexOf(endpoint)].version = version;

        if (this.selectedEndpoint && this.selectedEndpoint.id === endpoint.id) {
          this.selectedEndpoint.version = version;
          this.allApiPaths = createApiPaths({ version });
          this.apiPathsAuthenticator = this.allApiPaths.authenticator;
        }

        logger.log('Changed endpoint version successfully.');
        return version;
      }

      throw new ErrorInternal('Endpoint does not exist, please initialize an endpoint and try again.');
    }

    throw new ErrorInternal('Id and a valid version is required to change the version of a endpoint.');
  };

  /**
   * A setter to set the url of the selected Endpoint
   * @param url Base url for the endpoint
   * @param id Optional id parameter to change the url of a particular endpoint
   * @returns url of the endpoint if the operation is successful, undefined otherwise
   */
  setEndpointUrl = async (url: string, id?: string): Promise<string | undefined> => {
    if (!isValidString(id)) id = this.selectedEndpoint?.id;
    if (isValidStringArray([id, url])) {
      const endpoint = this.getEndpointById(id!);
      await this.logout();

      if (endpoint && isValidString(endpoint.url)) {
        this.endpoints[this.endpoints.indexOf(endpoint)].url = url;

        if (this.selectedEndpoint && this.selectedEndpoint.id === endpoint.id) {
          this.selectedEndpoint.url = url;
        }

        logger.log('Changed endpoint url successfully.');
        return url;
      }

      throw new ErrorInternal('Endpoint does not exist, please initialize an endpoint and try again.');
    }

    throw new ErrorInternal('Id and url is required to change the version of a endpoint.');
  };

  /**
   * A getter to return the api paths for the selected Endpoint
   * @returns ApiPaths for the selected endpoint if exists, otherwise returns default api paths
   */
  getApiPaths = (): ApiPaths => {
    return this.allApiPaths;
  };

  /**
   * A getter to get all the available Endpoints
   * @returns Endpoints array with all the available endpoints
   */
  getAllEndpoints = (): Endpoint[] => {
    return this.endpoints;
  };
}

export default new QorusAuthenticator();
