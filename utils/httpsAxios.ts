"use strict";

import axios from "axios";
import https from "https";


const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const httpsAxios = axios.create({ httpsAgent });

export default httpsAxios;