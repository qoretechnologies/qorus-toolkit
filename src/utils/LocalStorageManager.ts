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
class LocalStorageManager {
  private isBrowser: string;
  constructor() {
    this.isBrowser = detectEnvironment();
  }
  storeKeyValuePair(keyValue: IKeyValue) {
    const { key, value } = keyValue;
    if (this.isBrowser == 'browser') {
      window.localStorage.setItem(key, value);
    }
  }
  fetchKeyValuePair(key: string) {
    if (this.isBrowser == 'browser') {
      return window.localStorage.getItem(key);
    }
    return null;
  }
}

export default LocalStorageManager;
