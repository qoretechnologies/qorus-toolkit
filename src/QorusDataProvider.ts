import { QorusAuthenticator } from './QorusAuthenticator';

interface Provider {
  getDataProviderInfo: () => undefined;
}
const _DataProviders = (): Provider => {
  const getSelectedEndpoint = () => {
    return QorusAuthenticator.getSelectedEndpoint();
  };

  const getDataProviderInfo = () => {
    const selectedEndpoint = getSelectedEndpoint();
    return undefined;
  };

  return {
    getDataProviderInfo,
  };
};

export const DataProviders: Provider = _DataProviders();
