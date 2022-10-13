import dotenv from 'dotenv';
import { DataProvider, QorusAuthenticator as QorusAuth } from '../src';

dotenv.config();

if (!(process.env.ENDPOINT && process.env.TESTUSER && process.env.TESTPASS)) {
  throw new Error('Missing required environment variables');
}

describe('QorusDataProvider Utility Class Tests', () => {
  it('Should return dataprovider type', async () => {
    await QorusAuth.initEndpoint({
      url: process.env.ENDPOINT!,
      id: 'rippy',
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });
    // Get Data Provider Types
    const dataProviderTypes = await DataProvider.putDataProviderRecord({});
    expect(dataProviderTypes.find((provider) => provider.name === 'factory')).not.toBeUndefined();

    // Selecting factory Data Provider
    const dataProviderFactories = await DataProvider.putDataProviderRecord({ select: dataProviderTypes[0] });

    // Selecting db factory
    const selectDb = dataProviderFactories.filter((obj) => obj.name === 'db')[0];
    expect(selectDb).not.toBeUndefined();

    // Getting tables from db
    const dbProvider = await DataProvider.putDataProviderRecord({
      select: selectDb,
      constructor_options: { datasource: 'pgsql:omquser/omquser@omquser%bee' },
    });
    expect(dbProvider[0].type).toEqual('data-provider');
  });
});
