import axios from 'axios';
import {Agent} from 'https';

/**
 * A axios wrapper of https operations
 */
const httpsAgent = new Agent({
  rejectUnauthorized: false,
});
const httpsAxios = axios.create({ httpsAgent });

export default httpsAxios;
