'use strict';

import httpsAxios from './utils/httpsAxios';
import { CatchAll } from './utils/catchDecorators';
import log from 'logger-decorator';
import { setKeyValLocal, getKeyValLocal } from './utils/localStoreMan';

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
  #_authToken?: string | null;

  /**Qore Technologies endpoint to authenticate the user */
  #_endpoint;

  /**Version of the api */
  #_version = 'latest';
  
  /**Api paths for the api */
  #loginPath = `/api/${this.#_version}/public/login`;
  #logoutPath = `/api/${this.#_version}/logout`;
  #tokenValidate =`/api/${this.#_version}/system?action=validateWsToken`

  constructor(endpoint: string, version?: string) {
    this.#_endpoint = endpoint;
    this.#_version = version ? version : 'latest';
  }
  /**
   * A asynchronous public method to be called to authenticate the user
   *
   * @param params username and password of the user
   */
  @CatchAll
  @log()
  async login(params: ILoginParams): Promise<string> {
    const { user, pass } = params;
    const currentUser = await this.validateLocalUserToken();
    if (currentUser && currentUser !== 'invalid') {
      this.#_authToken = currentUser;
      return currentUser;
    } else
      try {
        const resp = await httpsAxios({
          method: 'post',
          url: `${this.#_endpoint}${this.#loginPath}`,
          data: { user, pass },
        });
        this.#_authToken = resp.data;
        setKeyValLocal({ key: 'auth-token', value: resp.data });
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
  private async validateLocalUserToken(): Promise<string | null> {
    const authToken = getKeyValLocal('auth-token');
    if (authToken) {
      try {
        const resp = await httpsAxios({
          method: 'get',
          url: `${this.#_endpoint}${this.#tokenValidate }`,
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
        url: `${this.#_endpoint}${this.#logoutPath}`,
      });
    } catch (error: any) {
      throw new Error(`Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`);
    }
    this.#_authToken = undefined;
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
    this.#_endpoint = endpoint;
  }

  /**
   * A getter to get the current authentication endpoint
   */
  get endpoint(): string {
    return this.#_endpoint;
  }

  /**
   * A getter to get the current jwt token
   */
  @log()
  get authToken(): string | null {
    if (this.#_authToken) return this.#_authToken;
    else {
      return null;
    }
  }
}

export default QorusIntegration;
