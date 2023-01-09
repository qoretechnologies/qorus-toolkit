import ErrorQorusRequest, { IErrorQorusRequestParams } from './managers/error/ErrorQorusRequest';
import QorusRequest, { QorusRequestResponse } from './QorusRequest';
import { getRequestPath } from './utils';
import { apiPathsInitial } from './utils/apiPaths';

/**
 * QorusJobs class provides methods to interact with Qorus server job api
 * - Get all jobs
 * - Get a job by id
 * - Delete a job
 * - Add a job
 * - Update a job
 * @returns QorusDataProvider class object
 * @Category QorusDataProvider
 */
class QorusJobs {
  browsePath = apiPathsInitial.jobs?.browse;

  /**
   * A getter to get all jobs or a particular job from Qorus server job api
   * @param jobId Optional job id of a QorusJob
   * @returns List of jobs if job id is not provided, job data if the job id is provided, undefined if the job is not find
   */
  async get(jobId?: TJobId): Promise<IJob[] | IJob> {
    const requestPath = getRequestPath([this.browsePath ?? '', jobId?.toString() ?? '']);
    const response = await QorusRequest.get({ path: requestPath });

    const responseAsJobs = response as QorusRequestResponse;
    const error = response as IErrorQorusRequestParams;

    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    const responseData = responseAsJobs?.data as IJob[];

    return responseData;
  }

  /**
   * Delete a job from a Qorus server
   * @param jobId Job id of a QorusJob
   * @returns undefined if the operation is successful, throws an error otherwise
   */
  async delete(jobId: TJobId): Promise<undefined> {
    const requestPath = getRequestPath([this.browsePath ?? '', jobId?.toString() ?? '']);
    const response = await QorusRequest.deleteReq({ path: requestPath });
    const error = response as IErrorQorusRequestParams;

    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    return undefined;
  }

  /**
   * Update a job from a Qorus server
   * @param jobId Job id of a QorusJob
   * @param jobSourceCode Source code of a job with updated values
   * @param metadata Optional metadata parameter to update metadata for a job
   * @returns Id of the job if the operation is successful, throws an error otherwise
   */
  async update(
    jobId: TJobId,
    jobSourceCode: TJobSourceCode,
    metadata?: Record<string, any>,
  ): Promise<IUpdateJobResponse> {
    const requestPath = getRequestPath([this.browsePath ?? '', jobId?.toString() ?? '']);
    const requestData = {
      code: jobSourceCode,
      metadata: metadata,
    };
    const response = await QorusRequest.put({ path: requestPath, data: requestData });
    const error = response as IErrorQorusRequestParams;
    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    const responseAsData = response as QorusRequestResponse;
    const jobUpdateReponse = responseAsData.data as IUpdateJobResponse;
    return jobUpdateReponse;
  }

  /**
   * Enable a job on a Qorus server
   * @param jobId Id of the job to be enabled
   * @returns EnableJobResponse with jobId, name, version of the job
   */
  async enable(jobId: TJobId): Promise<IEnableDisableJobResponse> {
    const requestPath = getRequestPath([this.browsePath ?? '', jobId?.toString()]);
    const requestParams = {
      action: 'enable',
    };
    const response = await QorusRequest.put({ path: requestPath, params: requestParams });
    const error = response as IErrorQorusRequestParams;
    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    const responseAsData = response as QorusRequestResponse;
    const jobEnableReponse = responseAsData.data as IEnableDisableJobResponse;
    return jobEnableReponse;
  }

  /**
   * Disable a job a job on a Qorus server
   * @param jobId Id of the job to be enabled
   * @returns EnableJobResponse with jobId, name, version of the job
   */
  async disable(jobId: TJobId): Promise<IEnableDisableJobResponse> {
    const requestPath = getRequestPath([this.browsePath ?? '', jobId?.toString()]);
    const requestParams = {
      action: 'disable',
    };
    const response = await QorusRequest.put({ path: requestPath, params: requestParams });
    const error = response as IErrorQorusRequestParams;
    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    const responseAsData = response as QorusRequestResponse;
    const jobDisableReponse = responseAsData.data as IEnableDisableJobResponse;
    return jobDisableReponse;
  }

  /**
   * Kill all the processes for a job a job on a Qorus server
   * @param jobId Id of the job to be enabled
   * @returns EnableJobResponse with jobId, name, version of the job
   */
  async killProcesses(jobId: TJobId): Promise<IKillProcessesResponse> {
    const requestPath = getRequestPath([this.browsePath ?? '', jobId?.toString()]);
    const requestParams = {
      action: 'kill',
    };
    const response = await QorusRequest.post({ path: requestPath, params: requestParams });
    const error = response as IErrorQorusRequestParams;
    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    const responseAsData = response as QorusRequestResponse;
    const jobKillReponse = responseAsData.data as IKillProcessesResponse;
    return jobKillReponse;
  }
}

export interface IKillProcessesResponse {
  // Status of the request ok if successful, err if err
  status: string;

  // Return code of the kill command
  code: number;
}

export interface IEnableDisableJobResponse {
  // Id of the job that has been enabled
  jobid: string;
  // Name of the job that has been enabled
  name: string;
  // Version of the job that has been enabled
  version: string;
  // Info of the job that has been enabled
  info: string;
}

export interface IUpdateJobResponse {
  id: number;
}

// Id of a job for QorusJobs
export type TJobId = number | string;

// Job source code
export type TJobSourceCode = string;

export default new QorusJobs();

export interface IJob {
  // Id of a job
  jobid: number;

  // Name of a job
  name: string;

  // Description of a job
  description: string;

  // Version of a job
  version: string;

  // Author of a job
  author: string;

  //SessionId for a job
  sessionid: number;

  // Verify if the job is a remote type
  remote: boolean;

  // Verify if the job is a manual_remote type
  manual_remote: boolean;

  // Verify if the job is open
  open: boolean;

  // Verify if the job run was skipped
  run_skipped: boolean;

  // Verify if the job is enabled
  enabled: boolean;

  // Code for a job
  code: string;

  // Verify if the job is class based
  class_based: boolean;

  // Class name of the class job is based on
  class_name: string;

  // Language used to create the job
  language: string;

  // Month of the job start data
  month: string;

  // Day of the job start data
  day: string;

  // Week day of the job start data
  wday: string;

  // Hour day of the job start data
  hour: string;

  // Minute day of the job start data
  minute: string;

  // Date when the job was last executed
  last_executed: Date;

  // Instance id of the last executed jbo
  last_executed_job_instanceid: number;

  // Verify if the job was updated manually
  manually_updated: boolean;

  // Date on which the job was created
  created: Date;

  // Date on which the job was modified
  modified: Date;

  // Source of the job
  source: string;

  // Line of the job
  line: string;

  // Config items for a job
  config_items: IJobConfigItem[];
}

export interface IJobConfigItem {
  // Name of a config_item
  name: string;

  // Value for a config_item
  value: string;

  // Parent a config_item
  parent: IParent;

  // Verifies if the config item has default value of templated string
  is_default_value_templated_string: boolean;

  // Verifies if the config item is a templated string
  is_value_templated_string: boolean;
}

export interface IParent {
  // Parent interface Itype
  'interface-type': string;

  // Parent interface Iname
  'interface-name': string;

  // Parent interface Iversion
  'interface-version': string;
}
