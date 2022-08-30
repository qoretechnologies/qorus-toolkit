/**
 * A helper function to check if the running environment is node or client
 *
 * @returns 'node' or 'browser' based on the current environment
 */
const detectEnvironment = (): 'node'|'browser' => {
  if (typeof process !== 'undefined' && process.release.name.search(/node|io.js/) !== -1) {
    return 'node';
  } else {
    return 'browser';
  }
};

export interface IKeyValue {
  key: string;
  value: string;
}

/**
 * A local storage helper to set key value pair in local storage
 * works only on the client side(browser)
 *
 */
const setKeyValLocal = (keyValue: IKeyValue) => {
  const isBrowser = detectEnvironment();
  const { key, value } = keyValue;
  if (isBrowser == 'browser') {
    window.localStorage.setItem(key, value);
  }
};

/**
 * A local storage helper to get key value pair in local storage
 * works only on the client side(browser)
 *
 */
const getKeyValLocal = (key: string) => {
  const isBrowser = detectEnvironment();
  if (isBrowser == 'browser') {
    return window.localStorage.getItem(key);
  }
  return null;
};

export { setKeyValLocal, getKeyValLocal };
