export * as Authenticator from './QorusAuthenticator';
export * as HttpRequest from './QorusRequest';
export * as DataProvider from './QorusDataProvider';
export * as QorusOptions from './QorusOptions';
export * as Validator from './QorusValidator';
export * as Jobs from './QorusJobs';
export * as Workflows from './QorusWorkflows';
export * as QorusInterface from './QorusInterface';

export { default as QorusAuthenticator } from './QorusAuthenticator';
export { default as QorusRequest } from './QorusRequest';
export { default as QorusDataProvider } from './QorusDataProvider';
export { default as QorusValidator } from './QorusValidator';
export { default as QorusJobs } from './QorusJobs';
export { default as QorusWorkflows } from './QorusWorkflows';

export { TVersion, IApiPaths, IApiPathsAuthenticator, IApiPathsDataProvider, IApiPathsJobs } from './utils/apiPaths';
export { TContext } from './QorusDataProvider';
export { IDefaultHeaders } from './QorusRequest';

/**
 * A record of objects with string key and string value
 */
export type TObjectWithStringKey = Record<string, string>;

/**
 * A record of objects with string key and any kind of value
 */
export type TObjectWithAnyValue = Record<string, any>;
