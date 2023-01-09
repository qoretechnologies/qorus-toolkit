import { QorusInterface } from './QorusInterface';
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
export class QorusJobs extends QorusInterface {
  constructor() {
    super(apiPathsInitial.jobs?.browse ?? '');
  }

  /**
   * A getter to get all jobs or a particular job from Qorus server job api
   * @param jobId Optional job id of a QorusJob
   * @returns List of jobs if job id is not provided, job data if the job id is provided, undefined if the job is not find
   */
  async get(jobId?: TJobId): Promise<IJob[] | undefined> {
    const response = await this._get(jobId);
    let jobResponse: IJob | IJob[];
    if (Array.isArray(response)) {
      jobResponse = response as IJob[];
    } else {
      jobResponse = [response as IJob];
    }
    return jobResponse;
  }
}

export default new QorusJobs();

export interface IKillProcessesResponse {
  /**
   * Status of the request ok if successful, err if err
   */
  status: string;

  /**
   * Return code of the kill command
   */
  code: number;
}

export interface IUpdateJobResponse {
  /**
   * Id of the job
   */
  id: number;
}

/**
 * Id of a job for QorusJobs
 */
export type TJobId = number | string;

/**
 * Job source code
 */
export type TJobSourceCode = string;

export interface IJob {
  /**
   * Id of a job
   */
  jobid: number;

  /**
   * Name of a job
   */
  name: string;

  /**
   * Description of a job
   */
  description: string;

  /**
   * Version of a job
   */
  version: string;

  /**
   * Author of a job
   */
  author: string;

  /**
   * SessionId for a job
   */
  sessionid: number;

  /**
   * Verify if the job is a remote type
   */
  remote: boolean;

  /**
   * Verify if the job is a manual_remote type
   */
  manual_remote: boolean;

  /**
   * Verify if the job is open
   */
  open: boolean;

  /**
   * Verify if the job run was skipped
   */
  run_skipped: boolean;

  /**
   * Verify if the job is enabled
   */
  enabled: boolean;

  /**
   * Code for a job
   */
  code: string;

  /**
   * Verify if the job is class based
   */
  class_based: boolean;

  /**
   * Class name of the class job is based on
   */
  class_name: string;

  /**
   * Language used to create the job
   */
  language: string;

  /**
   * Month of the job start data
   */
  month: string;

  /**
   * Day of the job start data
   */
  day: string;

  /**
   * Week day of the job start data
   */
  wday: string;

  /**
   * Hour day of the job start data
   */
  hour: string;

  /**
   * Minute day of the job start data
   */
  minute: string;

  /**
   * Date when the job was last executed
   */
  last_executed: Date;

  /**
   * Instance id of the last executed job
   */
  last_executed_job_instanceid: number;

  /**
   * Verify if the job was updated manually
   */
  manually_updated: boolean;

  /**
   * Date on which the job was created
   */
  created: Date;

  /**
   * Date on which the job was modified
   */
  modified: Date;

  /**
   * Source of the job
   */
  source: string;

  /**
   * Line of the job
   */
  line: string;

  /**
   * Config items for a job
   */
  config_items: IJobConfigItem[];
}

export interface IJobConfigItem {
  /**
   * Name ofa config_item
   */
  name: string;

  /**
   * Value for a config_item
   */
  value: string;

  /**
   * Parent a config_item
   */
  parent: IParent;

  /**
   * Verifies if the config item has default value of templated string
   */
  is_default_value_templated_string: boolean;

  /**
   * Verifies if the config item is a templated string
   */
  is_value_templated_string: boolean;
}

export interface IParent {
  /**
   * Parent interface type
   */
  'interface-type': string;

  /**
   * Parent interface name
   */
  'interface-name': string;

  /**
   * Parent interface version
   */
  'interface-version': string;
}
