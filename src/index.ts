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
export interface ObjectWithStringKey {
  [x: string]: string;
}
export interface ObjectWithAnyKey {
  [x: string]: any;
}
