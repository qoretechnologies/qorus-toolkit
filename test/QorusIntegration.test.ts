import { QorusAuth } from '../src';
import dotenv from 'dotenv';
dotenv.config();

describe('QorusLogin Utility Class Tests', () => {
  it('Should initialize the endpoint and assign it to the selected endpoint', () => {
    if (process.env.ENDPOINT) QorusAuth.initEndpoint({ url: process.env.ENDPOINT, id: 'reppy' });

    expect(QorusAuth.getSelectedEndpoint()!.id).toEqual('reppy');
    expect(QorusAuth.getSelectedEndpoint()!.url).toEqual(process.env.ENDPOINT);
  });

  it('Should return user token after authentication', async () => {
    await QorusAuth.login({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });

    expect(QorusAuth.getSelectedEndpoint()?.authToken).not.toBeNull();
  });

  it('Should return the enpoint from the endpoints array', () => {
    const endpoint = QorusAuth.getEndpointById('reppy');

    expect(endpoint?.id).toEqual('reppy');
  });

  it('Should return all the available endpoints', () => {
    const endpoints = QorusAuth.getAllEndpoints();

    expect(endpoints).not.toBeNull();
  });

  it('Should return version of the selected endpoint', () => {
    const version = QorusAuth.getEndpointVersion();

    expect(version).toEqual('latest');
  });

  it('Should set a new version for the endpoint', async () => {
    const success = await QorusAuth.setEndpointVersion({ version: 5 });

    expect(QorusAuth.getSelectedEndpoint()?.version).toEqual(5);
  });

  it('Should revalidate the user auth token for the selected endpoint', async () => {
    await QorusAuth.renewSelectedEndpointToken({ user: process.env.TESTUSER!, pass: process.env.TESTPASS! });

    expect(QorusAuth.getAuthToken).not.toBeNull();
  });

  it('Should return current user token if the user is authenticated', () => {
    expect(QorusAuth.getAuthToken()).not.toBeNull();
  });

  it('Should return the current endpoint', () => {
    const config = QorusAuth.getSelectedEndpoint();

    expect(config!.id).toEqual('reppy');
  });

  it('Should return all the endpoints', () => {
    const endpoints = QorusAuth.getAllEndpoints();

    expect(endpoints).not.toBeNull();
  });

  it('Should change the selected endpoint url and logout the user', async () => {
    await QorusAuth.setEndpointUrl({ url: 'https://www.google.com' });

    expect(QorusAuth.getSelectedEndpoint()?.url).toEqual('https://www.google.com');
    expect(QorusAuth.getAuthToken()).toBeUndefined();
  });

  it('Should select the endpoint by the provided id', async () => {
    if (process.env.ENDPOINT) QorusAuth.initEndpoint({ url: process.env.ENDPOINT, id: 'test' });
    QorusAuth.selectEndpoint('google');

    expect(QorusAuth.getSelectedEndpoint()?.id).toEqual('test');
  });
});
