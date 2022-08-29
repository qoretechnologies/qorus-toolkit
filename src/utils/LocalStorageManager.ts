import log from 'logger-decorator';

/**
 * A helper function to check if the running environment is node or client
 *
 * @returns 'node' or 'browser' based on the current environment
 */
const detectEnvironment = () => {
  if (typeof process !== 'undefined' && process.release.name.search(/node|io.js/) !== -1) {
    return 'node';
  } else {
    return 'browser';
  }
};

interface IKeyValue {
  key: string;
  value: string;
}

const storeKeyValuePair = (keyValue: IKeyValue) => {
  const isBrowser = detectEnvironment();
  const { key, value } = keyValue;
  if (isBrowser == 'browser') {
    window.localStorage.setItem(key, value);
  }
};

const readKeyValuePair = (key: string) => {
  const isBrowser = detectEnvironment();
  if (isBrowser == 'browser') {
    return window.localStorage.getItem(key);
  }
  return null;
};

export { readKeyValuePair, storeKeyValuePair };
