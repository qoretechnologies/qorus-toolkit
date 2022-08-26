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
class QorusIntegration {
  /**Token returned after authentication*/
  protected _authToken?: string | null;
  /**Qore Technologies endpoint to authenticate the user */
  private loginPath = "/api/latest/public/login";
  private logoutPath="/api/latest/logout";
  _endpoint;

  constructor(endpoint: string){
    this._endpoint = endpoint
  }
  /**
   * A asynchronous public method to be called to authenticate the user
   *
   * @param params username and password of the user
   */
  @CatchAll
  @log()
  async login(params: ILoginParams) {
    const { user, pass } = params;

    try {
      const resp = await httpsAxios({
        method: 'post',
        url: `${this._endpoint}${this.loginPath}`,
        data: { user, pass },
      });
      this._authToken = resp.data;
      return resp.data;
    } catch (error: any) {
      throw new Error(`Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
    }
  }

  /**
   * A asynchronous public method to be called to logout the user
   */
  @CatchAll
  @log()
  async logout() {
    try {
      await httpsAxios({
        method: 'post',
        url: `${this._endpoint}${this.logoutPath}`,
      });
    } catch (error: any) {
      throw new Error(`Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
    }
    this._authToken = undefined;
  }

  /**
   * A setter to configure the Authentication endpoint
   */
  @log()
  set endpoint(endpoint: string) {
    this.logout();
    this._endpoint = endpoint;
  }

  /**
   * A getter to get the current authentication endpoint
   */
  get endpoint() {
    return this._endpoint;
  }

  /**
   * A getter to get the current jwt token
   */
  @log()
  get authToken() {
    if (this._authToken) return this._authToken;
    else {
      return null;
    }
  }
}

export default QorusIntegration;
