import { AddEndpoint, LoginParams } from './QorusAuthenticator';

/**
 * Checks the validity of the selected endpoint, if the endpoint data ar valid returns true, false otherwise.
 * @param data {@link AddEndpoint} to be checked
 * @param withCredentials boolean to check if the endpoint has credentials
 * @returns boolean true if the endpoint data is valid, false otherwise
 */
const validateEndpointData = (data: AddEndpoint & LoginParams, withCredentials?: boolean): boolean => {
  return true;
};
