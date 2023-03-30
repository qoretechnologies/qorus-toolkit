import dotenv from 'dotenv';
import { QorusAuthenticator } from '../src';
import { QorusDataProvider } from '../src';

dotenv.config();

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusDataProvider Utility Class Tests', () => {
  jest.setTimeout(30000);
  beforeAll(async () => {
    await QorusAuthenticator.addEndpoint({
      url: process.env.ENDPOINT!,
      endpointId: 'rippyDataProvider',
    });
    await QorusAuthenticator.login({
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });
  });
  it('should browse the data providers with context record', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('record');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context api', async () => {
    const dataProviderBrowse = await QorusDataProvider.getApi();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('api');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context event', async () => {
    const dataProviderBrowse = await QorusDataProvider.getEvent();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('event');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context message', async () => {
    const dataProviderBrowse = await QorusDataProvider.getMessage();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('message');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context type', async () => {
    const dataProviderBrowse = await QorusDataProvider.getType();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('type');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context transaction', async () => {
    const dataProviderBrowse = await QorusDataProvider.getTransaction();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('transaction');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should select db factory data providers with context record', async () => {
    const dataProviderBrowse = await QorusDataProvider.getType();
    const browseChildrenNames = dataProviderBrowse.getChildrenNames();
    const factory = await dataProviderBrowse.get(browseChildrenNames.factory);
    const factoryChildrenNames = factory.getChildrenNames();

    const db = await factory.get(factoryChildrenNames.db, { datasource: 'pgsql:omquser/omquser@omquser%bee' });
    const dbChildren = db.getChildrenNames();

    expect(dbChildren.table_1).toEqual('table_1');
  });

  it('should check if the child is available', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const browseChildrenNames = dataProviderBrowse.getChildrenNames();
    const factory = await dataProviderBrowse.get(browseChildrenNames.factory);

    const db = await factory.has('db');

    expect(db).toEqual(true);
  });

  it('should return all the children names for the provider', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const browseChildrenNames = dataProviderBrowse.getChildrenNames();

    expect(browseChildrenNames.factory).toEqual('factory');
  });

  it('should fail to select db factory when provider options are not valid', async () => {
    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const browseChildrenNames = dataProviderBrowse.getChildrenNames();
    const factory = await dataProviderBrowse.get(browseChildrenNames.factory);
    const factoryChildrenNames = factory.getChildrenNames();

    let err;
    try {
      await factory.get(factoryChildrenNames.db);
    } catch (error) {
      err = error;
    }
    expect(err instanceof Error).toEqual(true);
  });
});
