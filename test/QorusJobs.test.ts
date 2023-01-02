import { QorusAuthenticator } from '../src';
import QorusJobs, { Job } from '../src/QorusJobs';

describe('Test jobs for config items', () => {
  beforeAll(async () => {
    QorusAuthenticator.addEndpoint({ url: 'https://api.qoretechnologies.com', endpointId: 'rippy' });
    await QorusAuthenticator.login({ user: 'rmalik', pass: 'yzu2d8smRoCetW8' });
  });

  it('should return all the jobs for a qorus server', async () => {
    const result = await QorusJobs.get();
    expect(typeof result[0].name).toEqual('string');
  });

  it('should get a job by id', async () => {
    const result = await QorusJobs.get(22);
    const job = result as Job;
    expect(typeof job.name).toEqual('string');
  });

  it('should enable a job', async () => {
    const result = await QorusJobs.enable(22);
    expect(result.jobid).toEqual(22);
  });

  it('should disable a job', async () => {
    const result = await QorusJobs.disable(22);
    expect(result.jobid).toEqual(22);
  });
});
