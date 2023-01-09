export interface IApiPaths {
  /**
   * Api paths for the QorusAuthenticator
   */
  authenticator: IAuthenticatorApiPaths;
  /**
   * Api paths for the QorusDataProvider
   */
  dataProviders: IDataProviderApiPaths;
  /**
   * Api paths for the QorusJobs
   */
  jobs?: IJobsApiPaths;
}

export interface IJobsApiPaths {
  /**
   * Path to browse Jobs for a QorusServer endpoint
   */
  browse: string;
}

export interface IDataProviderApiPaths {
  /**
   * Path to DataProvider browse for a QorusServer endpoint
   */
  browse: string;
}

export interface IAuthenticatorApiPaths {
  /**
   * Path to authenticate the user for a Qorus server endpoint
   */
  login: string;
  /**
   * Path to logout the user for a Qorus server endpoint
   */
  logout: string;
  /**
   * Path to validate a authentication token for a user for the Qorus server endpoint
   */
  validateToken: string;
  /**
   * Path to identify if no-auth is enabled for the user for a Qorus server endpoint
   */
  validateNoAuth: string;
}

/**
 * Allowed types of version for the Qorus server api
 */
export type TVersion = 1 | 2 | 3 | 4 | 5 | 6 | 'latest';
export interface IWithEndpointVersion {
  /**
   * Version for the server api
   */
  version?: TVersion;
}

/**Initial api routes */
export const apiPathsInitial: IApiPaths = {
  authenticator: {
    login: `/api/latest/public/login`,
    logout: `/api/latest/logout`,
    validateToken: `/api/latest/system?action=validateWsToken`,
    validateNoAuth: `/api/latest/public/info`,
  },
  dataProviders: {
    browse: '/api/latest/dataprovider/browse',
  },
};

/**
 * Utility function to create api routes
 * @param props optional version can be supplied to target the api with a specific version
 * @returns object with all the api endpoints
 */
export const createApiPaths = (props: IWithEndpointVersion): IApiPaths => {
  const { version } = props;
  const V = version && version !== 'latest' ? `v${version}` : 'latest';

  return {
    authenticator: {
      login: `/api/${V}/public/login`,
      logout: `/api/${V}/logout`,
      validateToken: `/api/${V}/system?action=validateWsToken`,
      validateNoAuth: `/api/${V}/public/info`,
    },
    dataProviders: {
      browse: `/api/${V}/dataprovider/browse`,
    },
  };
};
