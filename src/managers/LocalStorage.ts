/**
 * A helper function to check if the running environment is node or client
 *
 * @returns 'node' or 'browser' based on the current environment
 */
const detectEnvironment = (): 'node' | 'browser' | 'unknown' => {
  if (typeof process !== 'undefined' && process.title === 'node') {
    return 'node';
  } else if (typeof window != 'undefined') {
    return 'browser';
  } else return 'unknown';
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
  const environment = detectEnvironment();
  const { key, value } = keyValue;
  if (environment == 'browser') {
    window.localStorage.setItem(key, value);
  }
};

/**
 * A local storage helper to get key value pair in local storage
 * works only on the client side(browser)
 *
 */
const getKeyValLocal = (key: string) => {
  const environment = detectEnvironment();
  if (environment == 'browser') {
    return window.localStorage.getItem(key);
  }
  return null;
};

export { setKeyValLocal, getKeyValLocal };
