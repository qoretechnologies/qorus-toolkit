import { TObjectWithAnyValue } from './';
import { QorusInterface } from './QorusInterface';
import { apiPathsInitial } from './utils/apiPaths';

/**
 * QorusWorkflows class provides methods to interact with Qorus server workflow api
 * - Get all workflows
 * - Get a workflow by id
 * - Delete a workflow
 * - Add a workflow
 * - Update a workflow
 * @returns QorusDataProvider class object
 * @Category QorusDataProvider
 */
export class QorusWorkflows extends QorusInterface {
  constructor() {
    const browsePath: string = apiPathsInitial.workflows.browse;
    super(browsePath);
  }

  /**
   * A getter to get all workflows or a particular workflow from Qorus server workflow api
   * @param workflowId Optional workflow id of a QorusWorkflow
   * @returns List of workflows if workflow id is not provided, workflow data if the workflow id is provided, undefined if the workflow is not found
   */
  async get(workflowId?: TWorkflowId): Promise<IWorkflow[] | undefined> {
    const response = await this._get(workflowId);
    let workflowResponse: IWorkflow | IWorkflow[];
    if (Array.isArray(response)) {
      workflowResponse = response as IWorkflow[];
    } else {
      workflowResponse = [response as IWorkflow];
    }
    return workflowResponse;
  }

  /**
   * Increment auto start value for a Qorus workflow
   * @param workflowId Id of a workflow
   * @returns hash with the updated values, error otherwise
   */
  async incrementAutoStart(workflowId: TWorkflowId): Promise<IIncrementDecrementAutoStart> {
    const response = await this.makeActionCall('incAutostart', workflowId, false, 'put');
    return response as unknown as IIncrementDecrementAutoStart;
  }

  /**
   * Decrement auto start value for a Qorus workflow
   * @param workflowId Id of a workflow
   * @returns hash with the updated values, error otherwise
   */
  async decrementAutoStart(workflowId: TWorkflowId): Promise<IIncrementDecrementAutoStart | undefined> {
    const response = await this.makeActionCall('decAutostart', workflowId, false, 'put');
    return response as unknown as IIncrementDecrementAutoStart;
  }
}

export default new QorusWorkflows();

export interface IIncrementDecrementAutoStart {
  updated: boolean;
  autostart: number;
  info: string;
  started: number;
}

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

export interface IUpdateworkflowResponse {
  /**
   * Id of the updated workflow
   */
  id: number;
}

/**
 * Id of a workflow for QorusWorkflows
 */
export type TWorkflowId = number | string;

/**
 * Source code for a QorusWorkflow
 */
export type TworkflowSourceCode = string;

export interface IWorkflow {
  /**
   * Id of a workflow
   */
  workflowid: number;

  /**
   * Verify if autostart is enabled
   */
  autostart: number;

  /**
   * Verify if manual_autostart is enabled
   */
  manual_autostart: boolean;

  /**
   * Threshold to identify the services provided
   */
  sla_threshold: number;

  /**
   * Verify if sla-threshold can be set manually
   */
  manual_sla_threshold: boolean;

  /**
   * Verify if the detach is enabled
   */
  has_detach: boolean;

  /**
   * Verify if the workflow is deprecated
   */
  deprecated: false;

  /**
   * List of keys for a workflow
   */
  keylist: any | null;

  order_key_map: any | null;

  /**
   * Sitemap for a course workflow
   */
  sitemap: TObjectWithAnyValue;

  /**
   * Information about the steps used for a workflow
   */
  steps: TObjectWithAnyValue;

  segment: TObjectWithAnyValue[];

  /**
   * Sequence in which the steps for the workflow should be executed
   */
  stepseg: TObjectWithAnyValue;

  /**
   * Info for the steps
   */
  stepinfo: TObjectWithAnyValue[];

  wffuncs: TObjectWithAnyValue[];

  /**
   * Status of orders for a workflow
   */
  order_stats: TObjectWithAnyValue[];

  /**
   * Global config values used by a qorus workflow
   */
  global_config: TObjectWithAnyValue;

  /**
   * Execute workflow info
   */
  exec: TObjectWithAnyValue[];

  /**
   * Count to verify how many time the workflow was executed
   */
  exec_count: number;

  /**
   * Name of a workflow
   */
  name: string;

  /**
   * Description of a workflow
   */
  description: string;

  /**
   * Version of a workflow
   */
  version: string;

  /**
   * Author of a workflow
   */
  author: string;

  /**
   * Verify if the workflow is a remote type
   */
  remote: boolean;

  /**
   * Verify if the workflow is a manual_remote type
   */
  manual_remote: boolean;

  /**
   * Verify if the workflow is enabled
   */
  enabled: boolean;

  /**
   * Code for a workflow
   */
  code: string;

  /**
   * Language used to create the workflow
   */
  language: string;

  /**
   * Date on which the workflow was created
   */
  created: Date;

  /**
   * Date on which the workflow was modified
   */
  modified: Date;

  /**
   * Source of the workflow
   */
  source: string;

  /**
   * Line of the workflow
   */
  line: string;
}
