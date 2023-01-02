export interface ApiPaths {
  /**
   * Api paths for the QorusAuthenticator
   */
  authenticator: ApiPathsAuthenticator;
  /**
   * Api paths for the QorusDataProvider
   */
  dataProviders: ApiPathsDataProvider;
  jobs: ApiPathsJobs;
}

export interface ApiPathsJobs {
  browse: string;
}

export interface ApiPathsDataProvider {
  /**
   * Path to DataProvider browse for a QorusServer endpoint
   */
  browse: string;
}

export interface ApiPathsAuthenticator {
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
export type Version = 1 | 2 | 3 | 4 | 5 | 6 | 'latest';
export interface WithEndpointVersion {
  /**
   * Version for the server api
   */
  version?: Version;
}

/**Initial api routes */
export const apiPathsInitial: ApiPaths = {
  authenticator: {
    login: `/api/latest/public/login`,
    logout: `/api/latest/logout`,
    validateToken: `/api/latest/system?action=validateWsToken`,
    validateNoAuth: `/api/latest/public/info`,
  },
  dataProviders: {
    browse: '/api/latest/dataprovider/browse',
  },
  jobs: {
    browse: '/api/latest/jobs',
  },
};

/**
 * Utility function to create api routes
 *
 * @param props optional version can be supplied to target the api with a specific version
 * @returns object with all the api endpoints
 */
export const createApiPaths = (props: WithEndpointVersion): ApiPaths => {
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
    jobs: {
      browse: `/api/${V}/dataprovider/jobs`,
    },
  };
};
