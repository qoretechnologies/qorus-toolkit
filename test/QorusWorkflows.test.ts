import dotenv from 'dotenv';
import { QorusAuthenticator, QorusWorkflows } from '../src';
import { IIncrementDecrementAutoStart, IWorkflow } from '../src/QorusWorkflows';

dotenv.config();

describe('Qorus workflow unit tests', () => {
  beforeAll(async () => {
    QorusAuthenticator.addEndpoint({
      url: process.env.ENDPOINT_API!,
      endpointId: 'rippy',
    });
    await QorusAuthenticator.login({
      user: process.env.API_USER_NAME,
      pass: process.env.API_USER_PASS,
    });
  });
  it('should increment auto-start value', async () => {
    const workflow = await QorusWorkflows.incrementAutoStart(1);
    expect((workflow as IIncrementDecrementAutoStart).autostart).toEqual(1);
  });
  it('should decrement auto-start value', async () => {
    const workflow = await QorusWorkflows.decrementAutoStart(1);
    expect((workflow as IIncrementDecrementAutoStart).autostart).toEqual(0);
  });
  it('should get all workflow', async () => {
    const workflow = await QorusWorkflows.get();
    expect((workflow as IWorkflow[])[0].workflowid).not.toEqual(undefined);
  });
  it('should get workflow by id', async () => {
    const workflow = await QorusWorkflows.get(1);
    expect((workflow as IWorkflow[])[0].workflowid).toEqual(1);
  });
  it('should disable a workflow by id', async () => {
    const workflow = await QorusWorkflows.disable(1);
    expect(workflow?.id).toEqual(1);
  });
  it('should enable a workflow by id', async () => {
    const workflow = await QorusWorkflows.enable(1);
    expect(workflow?.id).toEqual(1);
  });
});
