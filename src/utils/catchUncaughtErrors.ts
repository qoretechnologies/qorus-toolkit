import { detect } from 'detect-browser';
const isBrowser = detect();

const listeners: Listener[] = [];

let handlersAreRegistered = false;

let handlersAreTurnedOn = false;

type Listener = (error, event) => void;

/**
 * Send error data to all listeners
 * @param {Object} error
 * @param {Object} event
 */
function callListeners(error, event) {
  listeners.forEach(function (listener) {
    listener(error, event);
  });
}

/**
 * Handler for browser uncaught errors
 * @param {Object} event
 */
function browserErrorHandler(event) {
  const error = event ? event.error : undefined;
  callListeners(error, event);
}

/**
 * Handler for browser uncaught promises rejections
 * @param {Object} event
 */
function browserRejectionHandler(event) {
  const error = event ? event.reason : undefined;
  callListeners(error, event);
}

/**
 * Handler for Node.js uncaught errors
 * @param {Object} error
 */
function nodeErrorHandler(error) {
  if (handlersAreTurnedOn) {
    callListeners(error, null);
  }
}

/**
 * Handler for Node.js uncaught promises rejections
 * @param {Object} reason
 */
function nodeRejectionHandler(reason) {
  if (handlersAreTurnedOn) {
    callListeners(reason, null);
  }
}

/**
 * Starts handling for uncaught errors and promises rejections
 */
export function startUncaughtListener() {
  if (handlersAreTurnedOn) {
    return;
  }

  if (!handlersAreRegistered) {
    if (isBrowser?.type !== 'node') {
      // Listen to uncaught errors
      window.addEventListener('error', browserErrorHandler);
      // Listen to uncaught promises rejections
      window.addEventListener('unhandledrejection', browserRejectionHandler);
    } else {
      process.on('uncaughtException', nodeErrorHandler);
      process.on('unhandledRejection', nodeRejectionHandler);
    }

    handlersAreRegistered = true;
  }

  handlersAreTurnedOn = true;
}

/**
 * Stops handling
 */
export function stopUncaughtListener() {
  if (!handlersAreTurnedOn) {
    return;
  }

  if (isBrowser?.type !== 'node') {
    window.removeEventListener('error', browserErrorHandler);
    window.removeEventListener('unhandledrejection', browserRejectionHandler);

    handlersAreRegistered = false;
  }

  handlersAreTurnedOn = false;
}

/**
 * Adds listener to list
 * @param {Function} listener
 */
export function addUncaughtListener(listener: (error, event) => void) {
  if (typeof listener === 'function') {
    listeners.push(listener as never);
  }
}

/**
 * Removes listener from list
 * @param {Function} listener
 */
export function removeUncaughtListener(listener) {
  const index = listeners.indexOf(listener as never);

  if (index > -1) {
    listeners.splice(index, 1);
  }
}

/**
 * Removes all listeners
 */
export function removeAllListeners() {
  listeners.length = 0;
}

/**
 * Flushes module: stops handling and removes all listeners
 */
export function flush() {
  removeAllListeners();
  stop();
}
