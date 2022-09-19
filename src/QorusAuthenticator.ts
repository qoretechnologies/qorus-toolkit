import { getKeyValLocal, setKeyValLocal } from './managers/LocalStorage';
import logger from './managers/logger';
import { ApiPaths, apiPathsInitial, createApiPaths, Version } from './utils/apiPaths';
import { QorusReq } from './utils/QorusRequest';

export interface Authenticator {
  /**
   * Enable the user to login to the selected endpoint
   * @param loginConfig login params of the user {@link LoginParams}
   *
   * Login function takes optional username and password parameters to authenticate the user.
   * If the username and password is not provided it tries to authenticate using the locally stored token from the selected endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   *
   * <script>
   * function runOnReplLogin(){
   * const replButton = document.getElementById("repl-login");
   * const code = document.getElementById("code-login");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("login-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;\n
   * //Initialize the endpoint before authentication
   * const endpoint = QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * const token = await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
  
   * <h3>Example</h3>
   * <button id="repl-login" onclick="runOnReplLogin()" style="border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-login"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * 
   * //Initialize the endpoint before authentication
   * const endpoint = QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * const token = await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });
   * </code></pre>
   * <div id="login-elem"></div>
   * 
   */
  login: (loginConfig: LoginParams) => Promise<string | undefined>;

  /**
   * Logs out the current user from the selected endpoint
   *
   * <script src="https://embed.runkit.com"></script>
   *
   * <script>
   * function runOnReplLogout(){
   * const replButton = document.getElementById("repl-logout");
   * const code = document.getElementById("code-logout");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("logout-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;\n
   * // Logs out the user
   * await QorusAuthenticator.logout();`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-logout" onclick="runOnReplLogout()" style="border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-logout"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   *
   * // Logs out the user
   * await QorusAuthenticator.logout();
   * </code></pre>
   * <div id="logout-elem"></div>
   */
  logout: () => Promise<void>;

  /**
   * Allows the user to add/initialize a new endpoint
   * @param props id and url are the mandatory parameters for initializing an endpoint {@link InitEndpoint}
   *
   * <script>
   * function runOnReplInitEndpoint(){
   * const replButton = document.getElementById("repl-init-endpoint");
   * const code = document.getElementById("code-init-endpoint");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("init-endpoint-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;\n
   * // Initializes a new endpoint and returns it
   * const endpoint = await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-init-endpoint" onclick="runOnReplInitEndpoint()" style="border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-init-endpoint"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   *
   * // Initializes a new endpoint and returns it
   * const endpoint = await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * </code></pre>
   * <div id="init-endpoint-elem"></div>
   */
  initEndpoint: (props: InitEndpoint) => Promise<Endpoint>;

  /**
   * Allows the user to select a endpoint from the endpoints array, logout the user from the current
   * selected endpoint\
   * @param id Id of the endpoint
   *
   * <script>
   * function runOnReplSelectEndpoint(){
   * const replButton = document.getElementById("repl-select-endpoint");
   * const code = document.getElementById("code-select-endpoint");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("select-endpoint-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Changes selected endpoint and return true if selected
   * const endpoint = await QorusAuthenticator.selectEndpoint('rippy');`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-select-endpoint" onclick="runOnReplSelectEndpoint()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-select-endpoint"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * // Changes selected endpoint and return true if selected
   * const endpoint = await QorusAuthenticator.selectEndpoint('rippy');
   * </code></pre>
   * <div id="select-endpoint-elem"></div>
   */
  selectEndpoint: (id: string) => Promise<boolean>;

  /**
   * Returns the selected endpoint
   *
   * Allows the user to select a endpoint from the endpoints array, logout the user from the current
   * selected endpoint
   *
   * <script>
   * function runOnReplGetSelectedEndpoint(){
   * const replButton = document.getElementById("repl-get-selected-endpoint");
   * const code = document.getElementById("code-get-selected-endpoint");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-selected-endpoint-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Returns selected endpoint
   * const endpoint = await QorusAuthenticator.getSelectedEndpoint();`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-get-selected-endpoint" onclick="runOnReplGetSelectedEndpoint()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-get-selected-endpoint"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * // Returns selected endpoint
   * const endpoint = await QorusAuthenticator.getSelectedEndpoint();
   * </code></pre>
   * <div id="get-selected-endpoint-elem"></div>
   */
  getSelectedEndpoint: () => Endpoint | undefined;

  /**
   * Allows the user to renew the selected endpoint authentication token
   * @param props {@link LoginParams} username and password of the user is mandatory
   *
   * <script>
   * function runOnReplRenewToken(){
   * const replButton = document.getElementById("repl-renew-token");
   * const code = document.getElementById("code-renew-token");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("renew-token-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Renews auth-token for the selected endpoint
   * const token = await QorusAuthenticator.renewSelectedEndpointToken({ user: 'rmalik', pass: 'rmalik1234' });`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-renew-token" onclick="runOnReplRenewToken()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-renew-token"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * // Renews auth-token for the selected endpoint
   * const token = await QorusAuthenticator.renewSelectedEndpointToken({ user: 'rmalik', pass: 'rmalik1234' });
   * </code></pre>
   * <div id="renew-token-elem"></div>
   */
  renewSelectedEndpointToken: (props: LoginParams) => Promise<null>;

  /**
   * A getter to return the endpoint if exist in the endpoints array
   * @param id ID of the endpoint ex: "rippy"
   *
   * <script>
   * function runOnReplGetEndpointById(){
   * const replButton = document.getElementById("repl-get-endpoint-by-id");
   * const code = document.getElementById("code-get-endpoint-by-id");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-endpoint-by-id-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * // Returns the endpoint if exists in the endpoints array
   * const endpoint = await QorusAuthenticator.getEndpointById('rippy');`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-get-endpoint-by-id" onclick="runOnReplGetEndpointById()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-get-endpoint-by-id"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * // Returns the endpoint if exists in the endpoints array
   * const endpoint = await QorusAuthenticator.getEndpointById('rippy');
   * </code></pre>
   * <div id="get-endpoint-by-id-elem"></div>
   */
  getEndpointById: (id: string) => Endpoint | undefined;

  /** A setter to set the url of the selected endpoint
   * @param url Base url for the endpoint
   * @param id Optional id parameter to change the url of a particular endpoint
   *
   * <script>
   * function runOnReplSetEndpointUrl(){
   * const replButton = document.getElementById("repl-set-endpoint-url");
   * const code = document.getElementById("code-set-endpoint-url");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("set-endpoint-url-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * await QorusAuthenticator.setEndpointUrl('https://www.google.com','rippy');
   * const endpoint = QorusAuthenticator.getSelectedEndpoint();`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-set-endpoint-url" onclick="runOnReplSetEndpointUrl()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-set-endpoint-url"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * await QorusAuthenticator.setEndpointUrl('https://www.google.com','rippy');
   * const endpoint = QorusAuthenticator.getSelectedEndpoint();
   * </code></pre>
   * <div id="set-endpoint-url-elem"></div>
   */
  setEndpointUrl: (url: string, id?: string) => Promise<null>;

  /** A setter to edit the version of the endpoint
   * @param version Version of the qorus api {@link Version}
   * @param id Optional id parameter to change the url of a particular endpoint from the endpoints array
   *
   * <script>
   * function runOnReplSetEndpointVersion(){
   * const replButton = document.getElementById("repl-set-endpoint-version");
   * const code = document.getElementById("code-set-endpoint-version");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("set-endpoint-version-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * await QorusAuthenticator.setEndpointVersion('https://www.google.com','rippy');
   * const endpoint = QorusAuthenticator.getSelectedEndpoint();
   * console.log(endpoint);`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-set-endpoint-version" onclick="runOnReplSetEndpointVersion()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-set-endpoint-version"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * await QorusAuthenticator.setEndpointVersion(6,'rippy');
   * const endpoint = QorusAuthenticator.getSelectedEndpoint();
   * console.log(endpoint);
   * </code></pre>
   * <div id="set-endpoint-version-elem"></div>
   */
  setEndpointVersion: (version: Version, id?: string) => Promise<null>;

  /** A getter to return the auth token of the selected endpoint
   *
   * <script>
   * function runOnReplGetAuthToken(){
   * const replButton = document.getElementById("repl-get-auth-token");
   * const code = document.getElementById("code-get-auth-token");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-auth-token-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });\n
   * const token = QorusAuthenticator.getAuthToken();`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-get-auth-token" onclick="runOnReplGetAuthToken()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-get-auth-token"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   * await QorusAuthenticator.login({ user: 'rmalik', pass: 'rmalik1234' });
   *
   * const token = QorusAuthenticator.getAuthToken();
   * </code></pre>
   * <div id="get-auth-token-elem"></div>
   */
  getAuthToken: () => string | undefined;

  /**
   * A getter to get the api version of a endpoint
   * @param id Optional id parameter to return the version of a particular endpoint
   *
   * <script>
   * function runOnReplGetEndpointVersion(){
   * const replButton = document.getElementById("repl-get-endpoint-version");
   * const code = document.getElementById("code-get-endpoint-version");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-endpoint-version-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * const version = QorusAuthenticator.getEndpointVersion();`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-get-endpoint-version" onclick="runOnReplGetEndpointVersion()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-get-endpoint-version"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * const version = QorusAuthenticator.getEndpointVersion();
   * </code></pre>
   * <div id="get-endpoint-version-elem"></div>
   */
  getEndpointVersion: (id?: string) => Version | undefined;

  /**
   * A getter to return the api paths for the selected endpoint
   *
   * <script>
   * function runOnReplGetApiPaths(){
   * const replButton = document.getElementById("repl-get-api-paths");
   * const code = document.getElementById("code-get-api-paths");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-api-paths-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * const apiPaths = QorusAuthenticator.getApiPaths();`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-get-api-paths" onclick="runOnReplGetApiPaths()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-get-api-paths"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * const apiPaths = QorusAuthenticator.getApiPaths();
   * </code></pre>
   * <div id="get-api-paths-elem"></div>
   */
  getApiPaths: () => ApiPaths;

  /**
   * A getter to get all the available endpoints
   *
   *  <script>
   * function runOnReplGetAllEndpoints(){
   * const replButton = document.getElementById("repl-get-all-endpoints");
   * const code = document.getElementById("code-get-all-endpoints");
   *
   * var notebook = RunKit.createNotebook({
   * element: document.getElementById("get-all-endpoints-elem"),
   * nodeVersion: "18.8.0",
   * source: `var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });\n
   * const apiPaths = QorusAuthenticator.getApiPaths();`
   * })
   * replButton.style.display = "none";
   * code.style.display = "none";
   * }
   * </script>
   *
   * <h3>Example</h3>
   * <button id="repl-get-all-endpoints" onclick="runOnReplGetAllEndpoints()" style="border-radius: 10px; border-radius: 10px; cursor: pointer; background-color: #33b277; border: none; margin-bottom: 10px; padding: 15px; color: #fff">Try in Repl</button>
   * <pre id="code-get-all-endpoints"><code class="language-ts">var qorusAuth = require("@qoretechnologies/qorus-toolkit");
   * const { QorusAuthenticator } = qorusAuth;
   * await QorusAuthenticator.initEndpoint({ id: 'rippy', url: 'https://hq.qoretechnologies.com:8092', version:'latest' });
   *
   * const endpoints = QorusAuthenticator.getAllEndpoints();
   * </code></pre>
   * <div id="get-all-endpoints-elem"></div>
   */
  getAllEndpoints: () => Endpoint[];
}

export interface LoginParams {
  user?: string;
  pass?: string;
}

export interface InitEndpoint {
  id: string;
  url: string;
  version?: Version;
}

export interface Endpoint {
  url: string;
  version: Version;
  id: string;
  authToken?: string;
}

export interface CheckAuth {
  url: string;
}

/**
 * Enables the user to authenticate with multiple user defined endpoints.
 * @returns QorusAuthenticator object with all the supporting operations
 * @example
 * ```ts
 * QorusAuth.init({url: "https://url of the instance", id: "rippy"});
 * const selectedEndpoint = QorusAuth.getSelectedEndpoint();
 * QorusAuth.login({user: 'username', pass: 'pass'});
 * QorusAuth.logout();
 * ```
 *
 * @Category QorusAuthenticator
 */
const _QorusAuthenticator = (): Authenticator => {
  //**Array of user defined endpoints */
  const endpoints: Endpoint[] = [];

  /**Api paths for the selected endpoint */
  let apiPaths: ApiPaths = apiPathsInitial;

  /**Selected endpoint from the endpoints array */
  let selectedEndpoint: Endpoint;

  let noauth = false;

  /**
   * A getter to return the endpoint if exist in the endpoints array
   * @param id of the endpoint
   * @returns endpoint if found else returs undefined
   *
   * @example
   * ```ts
   * const endpoint = getEndpointById();
   * console.log(endpoint);
   * ```
   */
  const getEndpointById = (id: string): Endpoint | undefined => {
    return endpoints.find((endpoint) => endpoint.id === id);
  };

  /**
   * Logs out the current user from the selected endpoint
   *
   * @example
   * ```ts
   * logout();
   * ```
   */
  const logout = async (): Promise<void> => {
    if (selectedEndpoint) {
      selectedEndpoint.authToken = undefined;
      apiPaths = apiPathsInitial;
      noauth = false;

      try {
        await QorusReq.post({ endpointUrl: `${selectedEndpoint.url}${apiPaths.logout}` });
      } catch (error: any) {
        logger.log({
          level: 'error',
          message: `Couldn't logout user, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`,
        });
      }
    }
  };

  /**
   * Allows the user to select a endpoint from the endpoints array,
   * Logs out the user from the current selected endpoint
   *
   * @param id id of the endpoint to be selected
   * @returns True if the endpoint is selected successfully False otherwise
   */
  const selectEndpoint = async (id: string): Promise<boolean> => {
    const endpoint = getEndpointById(id);
    if (endpoint && endpoint.url) {
      if (selectedEndpoint.authToken) {
        await logout();
      }

      selectedEndpoint = endpoint;
      apiPaths = createApiPaths({ version: endpoint.version });

      return true;
    }
    return false;
  };

  const checkNoAuth = async (url: string): Promise<null> => {
    let resp;

    try {
      resp = await QorusReq.get({ endpointUrl: `${url}${apiPaths.validateNoAuth}` });
      const _noauth = resp.data.noauth;

      if (typeof _noauth === 'boolean') {
        noauth = _noauth;
      }

      return null;
    } catch (error: any) {
      logger.log({
        level: 'error',
        message: `Couldn't check the noauth status: ${error.statusCode}, ErrorMessage: ${error.message}`,
      });
    }

    return null;
  };

  /**
   * Allows the user to add/initialize a new endpoint
   *
   * @param props id and url is required to initialize a new endpoint with default 'latest' version
   * @returns A new endpoint, select it as selected endpoint and adds it to the endpoints array
   */
  const initEndpoint = async (props: InitEndpoint): Promise<Endpoint> => {
    const { id, url, version } = props;
    const newEndpoint: Endpoint = {
      url,
      id,
      version: version ? version : 'latest',
    };
    const endpoint = getEndpointById(id);

    if (!endpoint) {
      endpoints.push(newEndpoint);

      if (selectedEndpoint) {
        await selectEndpoint(id);
      } else {
        selectedEndpoint = newEndpoint;
      }

      await checkNoAuth(url);
      return newEndpoint;
    } else {
      endpoints.push(newEndpoint);

      if (selectedEndpoint) {
        await selectEndpoint(id);
      } else {
        selectedEndpoint = newEndpoint;
      }

      await checkNoAuth(url);
      return newEndpoint;
    }
  };

  /**
   * A getter that returns the selected endpoint
   *
   * @returns Selected Endpoint
   */
  const getSelectedEndpoint = (): Endpoint | undefined => {
    return selectedEndpoint;
  };

  /**
   * Validates the local stored authentication token for the endpoint
   *
   * @param endpointId d of the endpoint to renew the auth token
   * @returns Promise that returns auth token if it's valid, invalid if the token is expired and null if there is no auth token stored in the local storage
   */
  const validateLocalUserToken = async (endpointId: string): Promise<string | 'invalid' | null> => {
    const authToken = getKeyValLocal(`auth-token-${endpointId}`);

    if (authToken) {
      try {
        const resp = await QorusReq.get({
          endpointUrl: `${endpoints}${apiPaths.validateToken}`,
          data: { token: authToken },
        });

        if (typeof resp === 'string') {
          return authToken;
        }
      } catch (error: any) {
        if (error.code === '409') {
          return 'invalid';
        } else
          logger.log({
            level: 'error',
            message: `Can't validate token, ErrorCode: ${error.code}, ErrorMessage: ${error.message}`,
          });
      }
    }

    return null;
  };

  /**
   * Enable the user to login to the selected endpoint
   * @param loginConfig username and password is required to login the user
   * @returns Authentication token for the user
   * @error throws an error if the provided credentials are invalid
   */
  const login = async (loginConfig: LoginParams): Promise<string | undefined> => {
    if (!noauth) {
      const { user, pass } = loginConfig;
      const { id } = selectedEndpoint;

      if (!(user && pass)) {
        logger.log({ level: 'error', message: 'Authentication is required with Username and Password' });

        return undefined;
      }

      const currentUserToken = await validateLocalUserToken(id);

      if (currentUserToken && currentUserToken !== 'invalid') {
        selectedEndpoint.authToken = currentUserToken;
        return currentUserToken;
      } else
        try {
          const resp = await QorusReq.post({
            endpointUrl: `${selectedEndpoint.url}${apiPaths.login}`,
            data: { user, pass },
          });
          const { token } = resp.data;
          selectedEndpoint.authToken = token;
          setKeyValLocal({ key: `auth-token-${id}`, value: token });

          return token;
        } catch (error: any) {
          logger.log({ level: 'error', message: `Couldn't sign in user ${error.statusCode} ${error.message}` });
        }
    }

    return undefined;
  };

  /**
   * Allows the user to renew the selected endpoint authentication token
   *
   * @param props Username and Password of the the user
   */
  const renewSelectedEndpointToken = async (props: LoginParams): Promise<null> => {
    const { user, pass } = props;

    if (selectedEndpoint) {
      await login({ user, pass });
    }

    return null;
  };

  /**
   * A getter to return the auth token of the selected endpoint
   *
   * @returns Authentication token for the selected endpoint
   */
  const getAuthToken = (): string | undefined => {
    return selectedEndpoint.authToken;
  };

  /**
   * A getter to get the api version of a endpoint
   *
   * @param id Optional id parameter to get the version of a certain endpoint
   * @returns Version of the selected endpoint if the id parameter is not provided otherwise returns the version of a certain endpoint
   */
  const getEndpointVersion = (id?: string): Version | undefined => {
    if (id) {
      return getEndpointById(id)?.version;
    } else {
      if (selectedEndpoint) {
        return selectedEndpoint.version;
      }
    }

    return undefined;
  };

  /**
   * A setter to edit the version of the endpoint
   *
   * @param props version is required to set a new version of the selected endpoint. Optional id can be supplied to change the version of a specific endpoint
   * @returns true if the version change is successful false otherwise
   */
  const setEndpointVersion = async (version: Version, id: string = selectedEndpoint.id): Promise<null> => {
    if (id) {
      const endpoint = getEndpointById(id);

      if (endpoint) {
        endpoints[endpoints.indexOf(endpoint)].version = version;

        if (selectedEndpoint.id === endpoint.id) {
          selectedEndpoint.version = version;
          apiPaths = createApiPaths({ version });
        }

        await logout();
        logger.log({ level: 'info', message: 'Changed endpoint version successfully.' });
        return null;
      }

      logger.log({ level: 'info', message: 'enpoint does not exist, please try again.' });
      return null;
    }

    logger.log({ level: 'info', message: 'id is required to change the version of a endpoint.' });
    return null;
  };

  /**
   * A setter to set the url of the selected endpoint
   *
   * @param props url is required to change the url of the selected endpoint. Option id parameter can be provided to change the url of a specific endpoint
   * @returns true if the url change is successful, false otherwise
   */
  const setEndpointUrl = async (url: string, id: string = selectedEndpoint.id): Promise<null> => {
    if (id) {
      const endpoint = getEndpointById(id);

      if (endpoint) {
        endpoints[endpoints.indexOf(endpoint)].url = url;

        if (selectedEndpoint.id === endpoint.id) {
          selectedEndpoint.url = url;
        }

        await logout();
        logger.log({ level: 'info', message: 'Changed endpoint url successfully.' });
        return null;
      }

      logger.log({ level: 'info', message: 'enpoint does not exist, please try again.' });
      return null;
    }

    logger.log({ level: 'info', message: 'id is required to change the url of a endpoint.' });
    return null;
  };

  /**
   * A getter to return the api paths for the selected endpoint
   *
   * @returns api paths for the selected endpoint
   */
  const getApiPaths = (): ApiPaths => {
    return apiPaths;
  };

  /**
   * A getter to get all the available endpoints
   *
   * @returns endpoints array with the current config
   */
  const getAllEndpoints = (): Endpoint[] => {
    return endpoints;
  };

  return {
    initEndpoint,
    login,
    logout,
    getAuthToken,
    setEndpointUrl,
    selectEndpoint,
    getSelectedEndpoint,
    renewSelectedEndpointToken,
    getEndpointById,
    getEndpointVersion,
    setEndpointVersion,
    getApiPaths,
    getAllEndpoints,
  };
};

export const QorusAuthenticator: Authenticator = _QorusAuthenticator();
