import { setKeyValLocal, getKeyValLocal } from './utils/localStoreMan';
import httpsAxios from './utils/httpsAxios';

interface IQorusAuthenticator {
  login: (loginConfig: ILoginParams) => Promise<string>;
  logout: () => Promise<void>;
  getAuthToken: () => string | undefined;
  setEndpntUrl: (props: ISetEndpointUrl) => boolean;
  initEndpnt: (props: IInitEndpoint) => IEndpoint;
  selectEndpnt: (id: string) => boolean;
  getSelectedEndpnt: () => IEndpoint | undefined;
  renewSelectedEndpntToken: (user: string, pass: string) => Promise<boolean>;
  getEndpnt: (id: string) => IEndpoint | undefined;
  setEndpntVer: (props: ISetEndpointVersion) => boolean;
  getEndpntVer: (id: string) => string | undefined;
  getApiPaths: () => IApiPaths;
  getAllEndpnts: () => IEndpoint[];
}

interface ILoginParams {
  user: string;
  pass: string;
}

interface IApiPathsParams {
  version?: string;
}

interface IApiPaths {
  login: string;
  logout: string;
  validateToken: string;
}

interface IInitEndpoint {
  id: string;
  url: string;
  version?: string;
}

interface IEndpoint {
  url: string;
  version: string;
  id: string;
  authToken?: string;
}

interface ISetEndpointVersion {
  version: string;
  id?: string;
}

interface ISetEndpointUrl {
  url: string;
  id?: string;
}

const createApiPaths = (props: IApiPathsParams): IApiPaths => {
  const { version } = props;

  return {
    login: `/api/${version ? version : 'latest'}/public/login`,
    logout: `/api/${version ? version : 'latest'}/logout`,
    validateToken: `/api/${version ? version : 'latest'}/system?action=validateWsToken`,
  };
};

const createEndpoint = (props: IEndpoint): IEndpoint => {
  const { url, version, authToken, id } = props;

  return {
    url,
    id,
    version: version ? version : 'latest',
    authToken,
  };
};

const apiPathsInitial: IApiPaths = {
  login: `/api/latest/public/login`,
  logout: `/api/latest/logout`,
  validateToken: `/api/latest/system?action=validateWsToken`,
};

const initialEndpoint: IEndpoint[] = [{ url: '', id: '', version: '' }];

const QorusAuthenticator = (): IQorusAuthenticator => {
  const endpoints: IEndpoint[] = initialEndpoint;
  let apiPaths: IApiPaths = apiPathsInitial;
  let selectedEndpoint: IEndpoint;

  const getEndpntIndxById = (id: string): number => {
    return endpoints.findIndex((endpnt) => endpnt.id === id);
  };

  const selectEndpnt = (id: string): boolean => {
    const index = getEndpntIndxById(id);
    if (endpoints[index]) {
      selectedEndpoint = endpoints[index];
      apiPaths = createApiPaths({ version: endpoints[index].version });
      return true;
    }
    return false;
  };

  const initEndpnt = (props: IInitEndpoint): IEndpoint => {
    const { id, url, version = 'latest' } = props;
    const newEndpnt = createEndpoint({ id, url, version });
    const index = getEndpntIndxById(id);
    if (index === -1) {
      endpoints.push(newEndpnt);
      selectEndpnt(id);
      return newEndpnt;
    } else {
      endpoints[index] = newEndpnt;
      selectEndpnt(id);
      return newEndpnt;
    }
  };

  const getSelectedEndpnt = (): IEndpoint | undefined => {
    return selectedEndpoint;
  };

  const validateLocalUserToken = async (endpntId: string) => {
    const authToken = getKeyValLocal(`auth-token-${endpntId}`);
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

  const login = async (loginConfig: ILoginParams): Promise<string> => {
    const { user, pass } = loginConfig;
    const { id } = selectedEndpoint;

    const currentUserToken = await validateLocalUserToken(id);
    if (currentUserToken && currentUserToken !== 'invalid') {
      const index = getEndpntIndxById(id);
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
        const index = getEndpntIndxById(id);
        if (index !== -1) endpoints[index].authToken = authToken;

        setKeyValLocal({ key: `auth-token-${id}`, value: authToken });
        return authToken;
      } catch (error: any) {
        throw new Error(`Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      }
  };

  const renewSelectedEndpntToken = async (user: string, pass: string): Promise<boolean> => {
    if (selectedEndpoint) {
      await login({ user, pass });
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    if (selectedEndpoint) {
      const index = getEndpntIndxById(selectedEndpoint.id);

      try {
        await httpsAxios({
          method: 'post',
          url: `${selectedEndpoint.url}${apiPaths.logout}`,
        });
      } catch (error: any) {
        throw new Error(`Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      }
      endpoints[index].authToken = undefined;
      selectedEndpoint.authToken = undefined;
    }
  };

  const getAuthToken = (): string | undefined => {
    return selectedEndpoint.authToken;
  };

  const getEndpnt = (id: string): IEndpoint | undefined => {
    const index = getEndpntIndxById(id);
    if (index != -1) return endpoints[index];
    return undefined;
  };

  const getEndpntVer = (id: string): string | undefined => {
    const index = getEndpntIndxById(id);
    if (index != -1 && endpoints[index]) {
      return endpoints[index].version;
    }
    return undefined;
  };

  const setEndpntVer = (props: ISetEndpointVersion): boolean => {
    const { version, id = selectedEndpoint.id } = props;

    if (id) {
      const index = getEndpntIndxById(id);
      if (index != -1 && endpoints[index].version) {
        endpoints[index].version = version;
        selectedEndpoint.version = version;
        apiPaths = createApiPaths({ version });
        return true;
      }
      return false;
    }

    return false;
  };

  const setEndpntUrl = (props: ISetEndpointUrl): boolean => {
    const { url, id = selectedEndpoint.id } = props;
    if (id) {
      const index = getEndpntIndxById(id);
      if (index != -1 && endpoints[index].url) {
        endpoints[index].url = url;
        selectedEndpoint.url = url;
        return true;
      }
      return false;
    }
    return false;
  };

  const getApiPaths = (): IApiPaths => {
    return apiPaths;
  };

  const getAllEndpnts = (): IEndpoint[] => {
    return endpoints;
  };

  return {
    initEndpnt,
    login,
    logout,
    getAuthToken,
    setEndpntUrl,
    selectEndpnt,
    getSelectedEndpnt,
    renewSelectedEndpntToken,
    getEndpnt,
    getEndpntVer,
    setEndpntVer,
    getApiPaths,
    getAllEndpnts,
  };
};

export {
  ILoginParams,
  IQorusAuthenticator,
  IApiPathsParams,
  IApiPaths,
  IInitEndpoint,
  IEndpoint,
  ISetEndpointUrl,
  ISetEndpointVersion,
};

export const QorusAuth = QorusAuthenticator();
export default QorusAuthenticator;
