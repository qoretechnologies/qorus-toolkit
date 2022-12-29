export * as Authenticator from './QorusAuthenticator';
export * as HttpRequest from './QorusRequest';
export * as DataProvider from './QorusDataProvider';
export * as QorusOptions from './QorusOptions';
export * as Validator from './QorusValidator';

export { default as QorusAuthenticator } from './QorusAuthenticator';
export { default as QorusRequest } from './QorusRequest';
export { default as QorusDataProvider } from './QorusDataProvider';
export { default as QorusValidator } from './QorusValidator';

export { Version, ApiPaths, ApiPathsAuthenticator, ApiPathsDataProvider } from './utils/apiPaths';
export { Context } from './QorusDataProvider';

/**
 * A record of objects with string key and string value
 */
export type ObjectWithStringKey = Record<string, string>;

/**
 * A record of objects with string key and any kind of value
 */
export type ObjectWithAnyKey = Record<string, any>;
