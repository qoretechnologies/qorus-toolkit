import { setKeyValLocal, getKeyValLocal } from './managers/LocalStorage';
import { apiPathsInitial, createApiPaths, IApiPaths, Version } from './utils/apiPaths';
import httpsAxios from './utils/httpsAxios';

interface IQorusAuthenticator {
  /**Enable the user to login to the selected endpoint */
  login: (loginConfig: ILoginParams) => Promise<string>;
  /**Logs out the current user from the selected endpoint */
  logout: () => Promise<void>;
  /**Allows the user to add/initialize a new endpoint */
  initEndpoint: (props: IInitEndpoint) => Promise<IEndpoint>;
  /**Allows the user to select a endpoint from the endpoints array */
  selectEndpoint: (id: string) => Promise<boolean>;
  /**Returns the selected endpoint */
  getSelectedEndpoint: () => IEndpoint | undefined;
  /**Allows the user to renew the selected endpoint authentication token */
  renewSelectedEndpointToken: (props: ILoginParams) => Promise<boolean>;
  /**Returns the endpoint if exist in the endpoint array */
  getEndpointById: (id: string) => IEndpoint | undefined;
  /**A setter to set the url of the selected endpoint */
  setEndpointUrl: (props: ISetEndpointUrl) => Promise<boolean>;
  /**A setter to edit the version of the endpoint */
  setEndpointVersion: (props: ISetEndpointVersion) => Promise<boolean>;
  /**A getter to return the auth token of the selected endpoint */
  getAuthToken: () => string | undefined;
  //**A getter to get the api version of a endpoint */
  getEndpointVersion: (id?: string) => Version | undefined;
  //**A getter to return the api paths for the selected endpoint */
  getApiPaths: () => IApiPaths;
  //**A getter to get all the availaible endpoints */
  getAllEndpoints: () => IEndpoint[];
}
interface ILoginParams {
  user: string;
  pass: string;
}

interface IInitEndpoint {
  id: string;
  url: string;
  version?: Version;
}

interface IEndpoint {
  url: string;
  version: Version;
  id: string;
  authToken?: string;
}

interface ISetEndpointVersion {
  version: Version;
  id?: string;
}

interface ISetEndpointUrl {
  url: string;
  id?: string;
}

/**
 * Helper function to create new endpoint
 *
 * @param props url and id is required to create a endpoint
 * @returns endpoint with the provided config
 */
const createEndpoint = (props: IEndpoint): IEndpoint => {
  const { url, version, authToken, id } = props;

  return {
    url,
    id,
    version: version ? version : 'latest',
    authToken,
  };
};

/**
 * Enables the user to authenticate with multiple user defined endpoints.
 *
 * @returns QorusAuthenticator object with all the supporting operations
 */
const QorusAuthenticator = (): IQorusAuthenticator => {
  //**Array of user defined endpoints */
  const endpoints: IEndpoint[] = [];

  /**Api paths for the selected endpoint */
  let apiPaths: IApiPaths = apiPathsInitial;

  /**Selected endpoint from the endpoints array */
  let selectedEndpoint: IEndpoint;

  /**
   * A getter to get the index of a endpoint in endpoints array
   *
   * @param id Id of the endpoint
   * @return Index of the endpoint
   */
  const getEndpointIndxById = (id: string): number => {
    return endpoints.findIndex((endpoint) => endpoint.id === id);
  };

  /**
   * Allows the user to select a endpoint from the endpoints array,
   * Logs out the user from the current selected endpoint
   *
   * @param id id of the endpoint to be selected
   * @returns True if the endpoint is selected successfully False otherwise
   */
  const selectEndpoint = async (id: string): Promise<boolean> => {
    const index = getEndpointIndxById(id);
    if (endpoints[index]) {
      await logout();
      selectedEndpoint = endpoints[index];
      apiPaths = createApiPaths({ version: endpoints[index].version });
      return true;
    }
    return false;
  };

  /**
   * Allows the user to add/initialize a new endpoint
   *
   * @param props id and url is required to initialize a new endpoint with default 'latest' version
   * @returns A new endpoint, select it as selected endpoint and adds it to the endpoints array
   */
  const initEndpoint = async (props: IInitEndpoint): Promise<IEndpoint> => {
    const { id, url, version } = props;
    const newEndpoint = createEndpoint({ id, url, version: version ? version : 'latest' });
    const index = getEndpointIndxById(id);
    if (index === -1) {
      endpoints.push(newEndpoint);
      if (selectedEndpoint) await selectEndpoint(id);
      else selectedEndpoint = newEndpoint;
      return newEndpoint;
    } else {
      endpoints.push(newEndpoint);
      if (selectedEndpoint) await selectEndpoint(id);
      else selectedEndpoint = newEndpoint;
      return newEndpoint;
    }
  };

  /**
   * A getter that returns the selected endpoint
   *
   * @returns Selected Endpoint
   */
  const getSelectedEndpoint = (): IEndpoint | undefined => {
    return selectedEndpoint;
  };

  /**
   * Validates the local stored authentication token for the endpoint
   *
   * @param endpointId Id of the endpoint to renew the auth token
   * @returns Promise that returns auth token if it's valid, invalid if the token is expired and null if there is no auth token stored in the local storage
   */
  const validateLocalUserToken = async (endpointId: string): Promise<string | 'invalid' | null> => {
    const authToken = getKeyValLocal(`auth-token-${endpointId}`);
    if (authToken) {
      try {
        const resp = await httpsAxios({
          method: 'get',
          url: `${endpoints}${apiPaths.validateToken}`,
          data: { token: authToken },
        });
        if (typeof resp === 'string') {
          return authToken;
        }
      } catch (error: any) {
        if (error.code === '409') return 'invalid';
        else throw new Error(`Can't validate token, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
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
  const login = async (loginConfig: ILoginParams): Promise<string> => {
    const { user, pass } = loginConfig;
    const { id } = selectedEndpoint;

    const currentUserToken = await validateLocalUserToken(id);
    if (currentUserToken && currentUserToken !== 'invalid') {
      const index = getEndpointIndxById(id);
      endpoints[index].authToken = currentUserToken;
      selectedEndpoint.authToken = currentUserToken;
      return currentUserToken;
    } else
      try {
        const resp = await httpsAxios({
          method: 'post',
          url: `${selectedEndpoint.url}${apiPaths.login}`,
          data: { user, pass },
        });

        const authToken = resp.data;
        selectedEndpoint.authToken = authToken;
        const index = getEndpointIndxById(id);
        if (index !== -1) endpoints[index].authToken = authToken;

        setKeyValLocal({ key: `auth-token-${id}`, value: authToken });
        return authToken;
      } catch (error: any) {
        throw new Error(`Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      }
  };

  /**
   * Allows the user to renew the selected endpoint authentication token
   *
   * @param props Username and Password of the the user
   */
  const renewSelectedEndpointToken = async (props: ILoginParams): Promise<boolean> => {
    const { user, pass } = props;

    if (selectedEndpoint) {
      await login({ user, pass });
      return true;
    }
    return false;
  };

  /**
   * Logs out the current user from the selected endpoint
   */
  const logout = async (): Promise<void> => {
    if (selectedEndpoint) {
      const index = getEndpointIndxById(selectedEndpoint.id);

      if (selectedEndpoint.authToken) {
        console.log("I am coming here")
        try {
          await httpsAxios({
            method: 'post',
            url: `${selectedEndpoint.url}${apiPaths.logout}`,
          });
        } catch (error: any) {
          console.log(`Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
        }
      }
      endpoints[index].authToken = undefined;
      selectedEndpoint.authToken = undefined;
    }
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
   * A getter to return the endpoint if exist in the endpoint array
   * @param id of the endpoint
   * @returns endpoint if found else returs undefined
   */
  const getEndpointById = (id: string): IEndpoint | undefined => {
    const index = getEndpointIndxById(id);
    if (index != -1) return endpoints[index];
    return undefined;
  };

  /**
   * A getter to get the api version of a endpoint
   *
   * @param id Optional id parameter to get the version of a certain endpoint
   * @returns Version of the selected endpoint if the id parameter is not provided otherwise returns the version of a certain endpoint
   */
  const getEndpointVersion = (id?: string): Version | undefined => {
    if (id) {
      const index = getEndpointIndxById(id);
      if (index != -1 && endpoints[index]) {
        return endpoints[index].version;
      }
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
  const setEndpointVersion = async (props: ISetEndpointVersion): Promise<boolean> => {
    const { version, id = selectedEndpoint.id } = props;

    if (id) {
      const index = getEndpointIndxById(id);
      if (index != -1 && endpoints[index].version) {
        await logout();
        endpoints[index].version = version;
        selectedEndpoint.version = version;
        apiPaths = createApiPaths({ version });
        return true;
      }
      return false;
    }

    return false;
  };

  /**
   * A setter to set the url of the selected endpoint
   *
   * @param props url is required to change the url of the selected endpoint. Option id parameter can be provided to change the url of a specific endpoint
   * @returns true if the url change is successful, false otherwise
   */
  const setEndpointUrl = async (props: ISetEndpointUrl): Promise<boolean> => {
    const { url, id = selectedEndpoint.id } = props;
    if (id) {
      const index = getEndpointIndxById(id);
      if (index != -1 && endpoints[index].url) {
        endpoints[index].url = url;
        selectedEndpoint.url = url;
        await logout();
        return true;
      }
      return false;
    }
    return false;
  };

  /**
   * A getter to return the api paths for the selected endpoint
   *
   * @returns api paths for the selected endpoint
   */
  const getApiPaths = (): IApiPaths => {
    return apiPaths;
  };

  /**
   * A getter to get all the availaible endpoints
   *
   * @returns endpoints array with the current config
   */
  const getAllEndpoints = (): IEndpoint[] => {
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

export {
  ILoginParams,
  IQorusAuthenticator,
  IApiPaths,
  IInitEndpoint,
  IEndpoint,
  ISetEndpointUrl,
  ISetEndpointVersion,
  Version,
};

export const QorusAuth = QorusAuthenticator();
export default QorusAuthenticator;
