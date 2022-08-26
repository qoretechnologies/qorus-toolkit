'use strict';

import httpsAxios from './utils/httpsAxios';
import { CatchAll } from './utils/catchDecorators';
import log from 'logger-decorator';

export interface ILoginParams {
  user: string;
  pass: string;
}

/**
 * An utility class to authenticate the user on QoreTechnologies networks
 *
 * @category Model
 */
class QorusLogin {
  /**JWT token returned after authentication*/
  usrToken?: string;
  /**Qore Technologies endpoint to authenticate the user */
  endpoint = 'https://hq.qoretechnologies.com:8092/api/latest/public/login';

  /**
   * A asynchronous public method to be called to authenticate the user
   *
   * @param params username and password of the user
   */
  @CatchAll
  @log({ level: 'verbose' })
  async login(params: ILoginParams) {
    const { user, pass } = params;

    try {
      const resp = await httpsAxios({
        method: 'post',
        url: this.endpoint,
        data: { user, pass },
      });
      this.usrToken = resp.data;
      return resp.data;
    } catch (error: any) {
      throw new Error(`Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
    }
  }

  /**
   * A asynchronous public method to be called to logout the user
   */
  @log({ level: 'verbose' })
  logout() {
    this.usrToken = undefined;
  }

  /**
   * A setter to configure the Authentication endpoint
   */
  @log({ level: 'verbose' })
  config(endpoint: string) {
    if (this.usrToken) {
      this.logout();
    }
    this.endpoint = endpoint;
  }

  /**
   * A getter to get the current authentication endpoint
   */
  @log({ level: 'verbose' }) 
  getConfig() {
    return this.endpoint;
  }

  /**
   * A getter to get the current jwt token
   */
  @log({ level: 'verbose' })
  getUserToken() {
    if (this.usrToken) return this.usrToken;
    else {
      return null;
    }
  }
}

export default QorusLogin;
