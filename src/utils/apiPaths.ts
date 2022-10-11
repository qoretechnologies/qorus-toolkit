export interface ApiPaths extends ApiPathsAuthenticator, ApiPathsDataProvider {}

export interface ApiPathsDataProvider {
  dataProviders: {
    browse: string;
  };
}

export interface ApiPathsAuthenticator {
  authenticator: {
    login: string;
    logout: string;
    validateToken: string;
    validateNoAuth: string;
  };
}

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
  };
};
