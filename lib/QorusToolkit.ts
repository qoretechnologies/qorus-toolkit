"use strict";

import logger from "./logger";
import httpsAxios from "../utils/httpsAxios";

interface ILoginParams {
  url?: string;
  user: string;
  pass: string;
}

class QorusToolkit {
  usrToken?: string;
  endpoint: string =
    "https://hq.qoretechnologies.com:31011/api/latest/public/login";

  async login(params: ILoginParams) {
    const {
      user,
      pass,
    } = params;

    try {
      const resp = await httpsAxios({
        method: "post",
        url: this.endpoint,
        data: { user: user, pass: pass },
      });
      logger.info(`User signed in with token : ${JSON.stringify(resp.data)}`);
      this.usrToken = resp.data;
      return resp.data;
    } catch (error: any) {
      logger.error(
        `Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`
      );
      throw new Error(
        `Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`
      );
    }
  }

  logout() {
    this.usrToken = undefined;
  }

  config(endpoint: string) {
    if (this.usrToken) {
      this.logout();
    }
    this.endpoint = endpoint;
    logger.info("Configurations changed please login again");
  }

  getConfig() {
    return this.endpoint;
  }

  getUserToken() {
    if (this.usrToken) return this.usrToken;
    else {
      logger.error("User is not signed in...");
      return null;
    }
  }
}

export default QorusToolkit;