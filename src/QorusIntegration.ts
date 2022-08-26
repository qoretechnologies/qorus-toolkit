'use strict';

import httpsAxios from './utils/httpsAxios';
import { CatchAll } from './utils/catchDecorators';
import log from 'logger-decorator';
import LocalStorageManager from './utils/LocalStorageManager';

export interface ILoginParams {
  user: string;
  pass: string;
}

enum ApiPaths {
  Login = '/api/latest/public/login',
  Logout = '/api/latest/logout',
  ValidateToken = '/api/latest/system?action=validateWsToken',
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
  _endpoint;
  protected LocalStoreManger = new LocalStorageManager();

  constructor(endpoint: string) {
    this._endpoint = endpoint;
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
    const currentUser = await this.validateLocalUserToken();
    if (currentUser && currentUser !== 'invalid') {
      this._authToken = currentUser;
      return currentUser;
    } else
      try {
        const resp = await httpsAxios({
          method: 'post',
          url: `${this._endpoint}${ApiPaths.Login}`,
          data: { user, pass },
        });
        this._authToken = resp.data;
        this.LocalStoreManger.storeKeyValuePair({ key: 'auth-token', value: resp.data });
        return resp.data;
      } catch (error: any) {
        throw new Error(`Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      }
  }

  private async validateLocalUserToken() {
    const authToken = this.LocalStoreManger.fetchKeyValuePair('auth-token');
    if (authToken) {
      try {
        const resp = await httpsAxios({
          method: 'get',
          url: `${this._endpoint}${ApiPaths.ValidateToken}`,
          data: { token: authToken },
        });
        if (typeof resp === 'string') {
          return authToken;
        }
      } catch (error: any) {
        if (error.code === '409') return 'invalid';
        else throw new Error(`Can't validate token, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      }
    }
    return null;
  }

  /**
   * A asynchronous public method to be called to logout the user
   */
  @CatchAll
  @log()
  async logout() {
    try {
      console.log(`${this._endpoint}${ApiPaths.Logout}`);
      await httpsAxios({
        method: 'post',
        url: `${this._endpoint}${ApiPaths.Logout}`,
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
