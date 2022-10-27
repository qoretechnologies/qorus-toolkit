import dotenv from 'dotenv';
import QorusAuthenticator from '../src/QorusAuthenticator';
import QorusDataProvider from '../src/QorusDataProvider';
import logger from '../src/managers/logger';

dotenv.config();
const winstonLoggerMock = jest.spyOn(logger, 'error');

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusDataProvider Utility Class Tests', () => {
  it('should browse the data providers with context record', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const dataProviderBrowse = await QorusDataProvider.getRecord();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('record');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context api', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const dataProviderBrowse = await QorusDataProvider.getApi();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('api');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context event', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const dataProviderBrowse = await QorusDataProvider.getEvent();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('event');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context message', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const dataProviderBrowse = await QorusDataProvider.getMessage();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('message');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should browse the data providers with context type', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const dataProviderBrowse = await QorusDataProvider.getType();
    const context = dataProviderBrowse.getContext();
    const providerChildren = dataProviderBrowse.getChildren();

    expect(context).toEqual('type');
    expect(providerChildren).not.toEqual(undefined);
  });

  it('should select db factory data providers with context record', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const dataProviderBrowse = await QorusDataProvider.getType();
    const browseChildrenNames = dataProviderBrowse.getChildrenNames();
    const factory = await dataProviderBrowse.get(browseChildrenNames.factory);
    const factoryChildrenNames = factory.getChildrenNames();

    const db = await factory.get(factoryChildrenNames.db, { datasource: 'pgsql:omquser/omquser@omquser%bee' });
    const dbChildren = db.getChildrenNames();

    expect(dbChildren.table_1).toEqual('table_1');
  });

  it('should fail to select db factory when provider options are not valid', async () => {
    await QorusAuthenticator.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });

    const dataProviderBrowse = await QorusDataProvider.getType();
    const browseChildrenNames = dataProviderBrowse.getChildrenNames();
    const factory = await dataProviderBrowse.get(browseChildrenNames.factory);
    const factoryChildrenNames = factory.getChildrenNames();

    const db = await factory.get(factoryChildrenNames.db);
    const dbError = db.getData().errorData.desc;

    expect(dbError).toContain('datasource');
    expect(dbError).toContain('DbDataProvider');
    expect(winstonLoggerMock).toHaveBeenCalledTimes(1);
  });
});
