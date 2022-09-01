export interface IApiPaths {
  login: string;
  logout: string;
  validateToken: string;
}

export type Version = 1 | 2 | 3 | 4 | 5 | 6 | 'latest';

export interface IApiPathsParams {
  version?: Version;
}

/**Initial api routes */
export const apiPathsInitial: IApiPaths = {
  login: `/api/latest/public/login`,
  logout: `/api/latest/logout`,
  validateToken: `/api/latest/system?action=validateWsToken`,
};

/**
 * Utility function to create api routes 
 *
 * @param props optional version can be supplied to target the api with a specific version
 * @returns object with all the api endpoints
 */
export const createApiPaths = (props: IApiPathsParams): IApiPaths => {
  const { version } = props;
  const V = version && version!=='latest' ? `v${version}` : 'latest';

  return {
    login: `/api/${V}/public/login`,
    logout: `/api/${V}/logout`,
    validateToken: `/api/${V}/system?action=validateWsToken`,
  };
};
