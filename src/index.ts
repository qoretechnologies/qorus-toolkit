export * as Authenticator from './QorusAuthenticator';
export * as DataProvider from './QorusDataProvider';
export * as QorusOptions from './QorusOptions';
export * as HttpRequest from './QorusRequest';
export * as Validator from './QorusValidator';
export { Version } from './utils/apiPaths';

export interface ObjectWithStringKey {
  [x: string]: string;
}
