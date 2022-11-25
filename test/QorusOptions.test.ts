import dotenv from 'dotenv';
import { QorusAuthenticator as QorusAuth, QorusDataProvider } from '../src';
import logger from '../src/managers/logger';

dotenv.config();
const loggerMock = jest.spyOn(logger, 'error');

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusDataProvider Utility Class Tests', () => {
  beforeAll(async () => {
    await QorusAuth.addEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy1',
    });
    await QorusAuth.login({
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });
  });

  it('should return constructor options for the provider', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');
    expect(options?.name).toEqual('db');
  });

  it('should set property value for the provider', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');

    options?.set('datasource', 'pgsql:omquser/omquser@omquser%bee');
    const values: any = options?.getAll();

    expect(values?.datasource).toEqual('pgsql:omquser/omquser@omquser%bee');
  });

  it('should return property object', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');

    const property = options?.get('datasource');
    expect(property?.name).toEqual('datasource');
  });

  it('should return js types for a property', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');
    const jsTypes = options?.getJsType('datasource');
    expect(jsTypes![1]).toEqual('object');
  });

  it('should return original types for a property', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');
    const originalTypes = options?.getType('datasource');

    expect(originalTypes![1]).toEqual('object<AbstractDatasource>');
  });

  it('should validate if all the required properties have value', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');
    options?.set('datasource', 'pgsql:omquser/omquser@omquser%bee');

    const isValid = options?.validate();

    expect(isValid).toEqual(true);
  });

  it('should get all the values needed for the provider and the request should be successful', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');
    options?.set('datasource', 'pgsql:omquser/omquser@omquser%bee');

    const dbProvider = await factoryProvider.get('db', options?.getAll());

    expect(dbProvider.getChildren()).not.toBeNull;
  });

  it('should validate the value for a property', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');

    expect(options?.validateProperty('datasource', 'pgsql:omquser/omquser@omquser%bee')).toEqual(true);
  });

  it('should fail with error, Children for the provider does not exist', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    factoryProvider.getOptions('some');
    expect(loggerMock.mock.lastCall[0]).toContain('Children for the provider "some" does not exist');
  });

  it('should print all the properties that requires validation', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const factoryProvider = await dataProviderBrowse.get('factory');
    const options = factoryProvider.getOptions('db');
    options?.validate();
    expect(loggerMock.mock.lastCall[0]).toContain('datasource is required for db provider');
  });
});
