import dotenv from 'dotenv';
import logger from '../src/managers/logger';
import QorusValidator from '../src/QorusValidator';

dotenv.config();
const winstonLoggerMock = jest.spyOn(logger, 'error');

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusDataProvider Utility Class Tests', () => {
  it('should validate the value for all string types', () => {
    expect(QorusValidator.validateField('binary', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('string', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('mapper', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('workflow', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('service', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('job', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('connection', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('softstring', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('select-string', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('file-string', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('file-as-string', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('binary', 'Qorus Test String')).toEqual(true);
    expect(QorusValidator.validateField('method-name', 'Qorus Test String')).toEqual(true);
  });

  it('should return false if the value is not string', () => {
    expect(QorusValidator.validateField('binary', 2)).toEqual(false);
    expect(QorusValidator.validateField('string', 2)).toEqual(false);
    expect(QorusValidator.validateField('mapper', 2)).toEqual(false);
    expect(QorusValidator.validateField('workflow', 2)).toEqual(false);
    expect(QorusValidator.validateField('service', 2)).toEqual(false);
    expect(QorusValidator.validateField('job', 2)).toEqual(false);
    expect(QorusValidator.validateField('connection', 2)).toEqual(false);
    expect(QorusValidator.validateField('softstring', 2)).toEqual(false);
    expect(QorusValidator.validateField('select-string', 2)).toEqual(false);
    expect(QorusValidator.validateField('file-string', 2)).toEqual(false);
    expect(QorusValidator.validateField('file-as-string', 2)).toEqual(false);
    expect(QorusValidator.validateField('method-name', 2)).toEqual(false);
    expect(QorusValidator.validateField('binary', 2)).toEqual(false);
  });

  it('should return true if class-connector value has required properties', () => {
    expect(QorusValidator.validateField('class-connectors', [{ name: 'name', method: 'method' }])).toEqual(true);
  });

  it('should return false if class-connector value does not have required properties', () => {
    // name and method are required properties for class-connector value
    expect(QorusValidator.validateField('class-connectors', [{ name: 'name' }])).toEqual(false);
    expect(QorusValidator.validateField('class-connectors', [])).toEqual(false);
    expect(QorusValidator.validateField('class-connectors', '')).toEqual(false);
  });

  it('should return true if the value is a number', () => {
    expect(QorusValidator.validateField('int', 2)).toEqual(true);
    expect(QorusValidator.validateField('softint', 2)).toEqual(true);
    expect(QorusValidator.validateField('number', 2)).toEqual(true);
    expect(QorusValidator.validateField('float', 2)).toEqual(true);
  });

  it('should return false if the value is not a number', () => {
    expect(QorusValidator.validateField('int', '2')).toEqual(false);
    expect(QorusValidator.validateField('softint', '2')).toEqual(false);
    expect(QorusValidator.validateField('number', '2')).toEqual(false);
    expect(QorusValidator.validateField('float', '2')).toEqual(false);
  });

  it('should return false if the value is a array with at least one item', () => {
    expect(QorusValidator.validateField('select-array', [])).toEqual(false);
    expect(QorusValidator.validateField('file-tree', [])).toEqual(false);
    expect(QorusValidator.validateField('array', [])).toEqual(false);
  });

  it('should return true if the value is a array with at least one item', () => {
    expect(QorusValidator.validateField('select-array', ['"Qorus test string"'])).toEqual(true);
    expect(QorusValidator.validateField('file-tree', ['"Qorus test string"'])).toEqual(true);
    expect(QorusValidator.validateField('array', ['"Qorus test string"'])).toEqual(true);
  });

  it('should return true if the value is a valid date', () => {
    expect(QorusValidator.validateField('date', new Date())).toEqual(true);
  });

  it('should return false if the value is not a valid date', () => {
    expect(QorusValidator.validateField('date', '"Qorus test string"')).toEqual(false);
  });

  it('should return false if the value is not an object', () => {
    expect(QorusValidator.validateField('hash', '"Qorus test string"')).toEqual(false);
    expect(QorusValidator.validateField('hash<auto>', '"Qorus test string"')).toEqual(false);
  });

  it('should return true if the value is a object', () => {
    expect(QorusValidator.validateField('hash', {})).toEqual(true);
    expect(QorusValidator.validateField('hash<auto>', {})).toEqual(true);
  });

  it('should return true if the value a object', () => {
    expect(QorusValidator.validateField('list', {})).toEqual(true);
    expect(QorusValidator.validateField('list<auto>', {})).toEqual(true);
    expect(QorusValidator.validateField('softlist<auto>', {})).toEqual(true);
  });

  it('should return false if the value is not an object', () => {
    expect(QorusValidator.validateField('list', 'Qorus test string')).toEqual(false);
    expect(QorusValidator.validateField('list<auto>', 'Qorus test string')).toEqual(false);
    expect(QorusValidator.validateField('softlist<auto>', 'Qorus test string')).toEqual(false);
  });

  it('should return false if the value is not a valid mapper-code string', () => {
    expect(QorusValidator.validateField('mapper-code', 'Qorus test string')).toEqual(false);
  });

  it('should return true if the value is a valid mapper-code string', () => {
    expect(QorusValidator.validateField('mapper-code', 'code::method')).toEqual(true);
  });

  it('should return false if the value is not a valid context-selector string', () => {
    expect(QorusValidator.validateField('context-selector', 'Qorus test string')).toEqual(false);
  });

  it('should return true if the value is a valid context-selector string', () => {
    expect(QorusValidator.validateField('context-selector', 'code:method')).toEqual(true);
  });

  it('should return true if the value is a valid url string', () => {
    expect(QorusValidator.validateField('url', 'https://www.something.com')).toEqual(true);
  });

  it('should return false if the value is not a valid url string', () => {
    expect(QorusValidator.validateField('url', 'Qorus test string')).toEqual(false);
  });

  it('should return false if the type is nothing', () => {
    expect(QorusValidator.validateField('nothing', 'Qorus test string')).toEqual(false);
  });

  it('should return false if the value does not contain required fields for byte-size', () => {
    expect(QorusValidator.validateField('byte-size', 'Qorus test string')).toEqual(false);
    expect(QorusValidator.validateField('byte-size', 'MB')).toEqual(false);
    expect(QorusValidator.validateField('byte-size', '23')).toEqual(false);
    expect(QorusValidator.validateField('byte-size', 23)).toEqual(false);
  });

  it('should return true if the value contains valid string for byte-size', () => {
    expect(QorusValidator.validateField('byte-size', '23MB')).toEqual(true);
  });

  it('should return true if the value for endpoint is a string for api-endpoints', () => {
    expect(QorusValidator.validateField('api-endpoints', [{ value: 'endpoint' }])).toEqual(true);
  });

  it('should return false if the value for endpoint is not a string for api-endpoints', () => {
    expect(QorusValidator.validateField('api-endpoints', [{ value: 3 }])).toEqual(false);
    expect(QorusValidator.validateField('api-endpoints', [])).toEqual(false);
    expect(QorusValidator.validateField('api-endpoints', 'Qorus test string')).toEqual(false);
  });

  it('should return true if all the required fields are valid for api-manager', () => {
    expect(
      QorusValidator.validateField('api-manager', {
        factory: 'factory',
        'provider-options': 'some',
        endpoints: [{ value: 'endpoint' }],
      }),
    ).toEqual(true);
  });

  it('should return false if the required fields are not provided for api-manager', () => {
    expect(
      QorusValidator.validateField('api-manager', {
        'provider-options': 'some',
        endpoints: [{ value: 'endpoint' }],
      }),
    ).toEqual(false);

    expect(QorusValidator.validateField('api-manager', {})).toEqual(false);
  });

  it('should return false if the value is empty or not a string', () => {
    expect(QorusValidator.validateField('options', '')).toEqual(false);
    expect(QorusValidator.validateField('pipeline-options', '')).toEqual(false);
    expect(QorusValidator.validateField('mapper-options', '')).toEqual(false);
    expect(QorusValidator.validateField('system-options', '')).toEqual(false);
  });

  it('should return true if the value is not a empty string', () => {
    expect(QorusValidator.validateField('options', 'Qorus test string')).toEqual(true);
    expect(QorusValidator.validateField('pipeline-options', 'Qorus test string')).toEqual(true);
    expect(QorusValidator.validateField('mapper-options', 'Qorus test string')).toEqual(true);
    expect(QorusValidator.validateField('system-options', 'Qorus test string')).toEqual(true);
  });

  it('should return true if the value is not a empty string', () => {
    expect(QorusValidator.validateField('options', 'Qorus test string')).toEqual(true);
    expect(QorusValidator.validateField('pipeline-options', 'Qorus test string')).toEqual(true);
    expect(QorusValidator.validateField('mapper-options', 'Qorus test string')).toEqual(true);
    expect(QorusValidator.validateField('system-options', 'Qorus test string')).toEqual(true);
  });

  it('should return true if the value contains valid required fields for fsm-list', () => {
    expect(QorusValidator.validateField('fsm-list', [{ name: 'Qorus test string' }])).toEqual(true);
  });

  it('should return false if the value does not contains valid required fields for fsm-list', () => {
    expect(QorusValidator.validateField('fsm-list', [{ name: 2 }])).toEqual(false);
    expect(QorusValidator.validateField('fsm-list', [])).toEqual(false);
    expect(QorusValidator.validateField('fsm-list', [{}])).toEqual(false);
  });

  it('should return true if the value is valid yaml', () => {
    expect(QorusValidator.validateField('any', [{ something: { something: { something: 'value' } } }])).toEqual(true);
    expect(QorusValidator.validateField('auto', [{ something: { something: { something: 'value' } } }])).toEqual(true);
  });

  it('should return false if the value is not valid yaml', () => {
    expect(QorusValidator.validateField('any', [])).toEqual(false);
    expect(QorusValidator.validateField('auto', '')).toEqual(false);
  });

  it('should return true if the value is not valid yaml', () => {
    expect(QorusValidator.validateField('any', [])).toEqual(false);
    expect(QorusValidator.validateField('auto', '')).toEqual(false);
  });

  it('should return true if the provided value is an object', () => {
    expect(QorusValidator.validateField('data-provider', { type: 'factory', name: 'factory' })).toEqual(true);
    expect(
      QorusValidator.validateField('type-selector', { type: 'type-selector', name: 'factory', path: 'factory' }),
    ).toEqual(true);
  });

  it('should return false if the provided value not a valid object', () => {
    expect(QorusValidator.validateField('data-provider', {})).toEqual(false);
    expect(QorusValidator.validateField('type-selector', [])).toEqual(false);
  });

  it('should return true if all the required values are valid for processor', () => {
    expect(
      QorusValidator.validateField('processor', {
        'processor-input-type': { type: 'type-selector', name: 'factory', path: 'factory' },
        'processor-output-type': { type: 'type-selector', name: 'factory', path: 'factory' },
      }),
    ).toEqual(true);
  });

  it('should return false if the required values for the processor are not valid', () => {
    expect(QorusValidator.validateField('processor', {})).toEqual(false);
    expect(
      QorusValidator.validateField('processor', {
        'processor-input-type': { type: 'type-selector', name: 'factory', path: 'factory' },
      }),
    ).toEqual(false);
    expect(
      QorusValidator.validateField('processor', {
        'processor-output-type': { type: 'type-selector', name: 'factory', path: 'factory' },
      }),
    ).toEqual(false);
  });

  it('should return false if the provided data is not a valid system-options-with-operators', () => {
    expect(
      QorusValidator.validateField('system-options-with-operators', [
        {
          type: 'any',
          value: [{ something: { something: { something: 'value' } } }],
          op: ['some'],
        },
      ]),
    ).toEqual(false);
  });

  it('should return true if the value is a valid class-array', () => {
    expect(QorusValidator.validateField('class-array', [{ name: 'Qorus test string' }])).toEqual(true);
  });

  it('should return false if the value is not a valid class-array', () => {
    expect(QorusValidator.validateField('class-array', [])).toEqual(false);
  });
});
