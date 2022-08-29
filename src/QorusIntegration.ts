'use strict';

import httpsAxios from './utils/httpsAxios';
import { CatchAll } from './utils/catchDecorators';
import log from 'logger-decorator';
import { readKeyValuePair, storeKeyValuePair } from './utils/LocalStorageManager';

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
        storeKeyValuePair({ key: 'auth-token', value: resp.data });
        return resp.data;
      } catch (error: any) {
        throw new Error(`Couldn't sign in user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      }
  }

  /**
   * A asynchronous private method to check if the locally stored token is valid and return it.
   *
   * @returns auth token if it's valid or null
   */
  private async validateLocalUserToken() {
    const authToken = readKeyValuePair('auth-token');
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
   * A asynchronous setter to configure the Authentication endpoint
   */
  @log()
  set endpoint(endpoint: string) {
    (async () => {
      try {
        await this.logout();
      } catch (error: any) {
        throw new Error(`Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
      }
    })();
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
