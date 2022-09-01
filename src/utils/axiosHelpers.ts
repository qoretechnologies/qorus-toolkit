import axios from 'axios';
import { Agent } from 'https';

/**
 * A axios wrapper of https operations
 */
const httpsAgent = new Agent({
  rejectUnauthorized: false,
});
const httpsAxios = axios.create({ httpsAgent });
const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

interface AxiosGet {
  endpointUrl: string;
  data?: any;
}
export const axiosGet = async (props: AxiosGet) => {
  const { endpointUrl, data } = props;
  return await httpsAxios({
    method: 'GET',
    url: endpointUrl,
    data: data,
    headers: headers,
  });
};

interface AxiosPost {
  endpointUrl: string;
  data?: any;
}
export const axiosPost = (props: AxiosPost) => {
  const { endpointUrl, data } = props;
  return httpsAxios({
    method: 'POST',
    url: endpointUrl,
    data,
    headers: headers,
  });
};

export default httpsAxios;
