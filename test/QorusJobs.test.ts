import dotenv from 'dotenv';
import { QorusAuthenticator, QorusJobs } from '../src';
import { IJob } from '../src/QorusJobs';

dotenv.config();

describe('Qorus job unit tests', () => {
  beforeAll(async () => {
    QorusAuthenticator.addEndpoint({
      url: process.env.ENDPOINT_API!,
      endpointId: 'rippyDataProvider',
    });
    await QorusAuthenticator.login({
      user: process.env.API_USER_NAME,
      pass: process.env.API_USER_PASS,
    });
  });
  it('should get all job by id', async () => {
    const job = await QorusJobs.get(22);
    expect((job as IJob[])[0].jobid).toEqual(22);
  });
  it('should enable a job by id', async () => {
    const job = await QorusJobs.enable(22);
    expect(job?.id).toEqual(22);
  });
});
