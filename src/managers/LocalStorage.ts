import { detect } from 'detect-browser';

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
  const browser = detect();
  const { key, value } = keyValue;
  if (browser) {
    window.localStorage.setItem(key, value);
  }
};

/**
 * A local storage helper to get key value pair in local storage
 * works only on the client side(browser)
 *
 */
const getKeyValLocal = (key: string) => {
  const browser = detect();
  if (browser) {
    return window.localStorage.getItem(key);
  }
  return null;
};

export { setKeyValLocal, getKeyValLocal };
