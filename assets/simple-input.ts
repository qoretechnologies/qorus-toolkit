/**
 * Checks the validity of the selected endpoint, if the endpoint data ar valid returns true, false otherwise.
 * @param data {@link AddEndpoint} to be checked
 * @param withCredentials boolean to check if the endpoint has credentials
 * @returns boolean true if the endpoint data is valid, false otherwise
 */
const validateEndpointData = (data: AddEndpoint & LoginParams, withCredentials?: boolean): boolean => {
  let valid = true;
  const fixedData = this.#fixEndpointData(data);

  if (
    !(
      QorusValidator.validate('string', fixedData.id) &&
      QorusValidator.validate('string', fixedData.url) &&
      QorusValidator.validate('version', fixedData.version)
    )
  ) {
    valid = false;
  }

  if (
    withCredentials &&
    !(QorusValidator.validate('string', fixedData.user) && QorusValidator.validate('string', fixedData.pass))
  ) {
    valid = false;
  }

  return valid;
};
