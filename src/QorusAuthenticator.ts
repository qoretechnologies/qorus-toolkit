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

export interface InitEndpoint extends WithQorusURL, WithEndpointVersion, WithQorusEndpointId {}

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
   * -selectEndpoint-function Allows the user to select a endpoint from the endpoints array, logout the user from the current
   * selected endpoint
   *
   * @param id Id of the endpoint
   *
   * Returns endpoint if the operation is successful false otherwise.
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

  // Check if the server has noauth enabled
  checkNoAuth = async (endpoint?: Endpoint): Promise<boolean> => {
    let resp;
    try {
      resp = await QorusRequest.get({ path: `${this.apiPathsAuthenticator.validateNoAuth}` }, endpoint);
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
      throw new ErrorInternal(`Cannot verify no-auth, ${JSON.stringify(error)})`);
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
   * Fixed the endpoint data
   * param data {@link InitEndpoint} to be fixed
   */
  #fixEndpointData(data: InitEndpoint): InitEndpoint & LoginParams {
    const newData = { ...data };

    if (!newData.version) {
      newData.version = 'latest';
    }

    return newData;
  }

  /**
   * Checks the validity of the selected endpoint, if the endpoint data ar valid returns true, false otherwise.
   * @param data {@link InitEndpoint} to be checked
   * @param withCredentials boolean to check if the endpoint has credentials
   */
  validateEndpointData = (data: InitEndpoint & LoginParams, withCredentials?: boolean): boolean => {
    let valid: boolean = true;
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
   * Validates the local stored authentication token for the endpoint
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
   * -login-function Takes optional username and password parameters to authenticate the user.
   If the username and password is not provided it tries to authenticate using the locally stored token from the selected {@link Endpoint}

   * token if the authentication is successful else returns undefined
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
   * -initEndpoint-function Allows the user to add/initialize a new endpoint
   * @param props {@link InitEndpoint} requires url and accepts optional user and pass parameters to initialize the endpoint and then authenticate the user
   *
   * Returns the newly created endpoint
   */
  initEndpoint = (endpointConfig: InitEndpoint): Endpoint | undefined => {
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
   * -renewSelectedEndpointToken-function Allows the user to renew the selected endpoint authentication token
   *
   * @param props {@link LoginParams} optional username and password can be provided
   * Returns token if the authentication is successful, undefined otherwise
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
    if (isValidString(id)) {
      return this.getEndpointById(id!)?.version;
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
    if (isValidString(id) && this.validateVersion(version)) {
      const endpoint = this.getEndpointById(id!);
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
   * -setEndpointUrl-function A setter to set the url of the selected {@link Endpoint}
   * @param url Base url for the endpoint
   * @param id Optional id parameter to change the url of a particular endpoint
   *
   * Returns url of the endpoint if the operation is successful, undefined otherwise
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
