import ErrorQorusRequest, { IErrorQorusRequestParams } from './managers/error/ErrorQorusRequest';
import QorusRequest, { QorusRequestResponse } from './QorusRequest';
import { getRequestPath } from './utils';

/**
 * QorusInterface is a master class used by different Qorus Interfaces
 * - Allows to call available actions on an Qorus interface
 * @returns QorusInterface class object
 * @Category QorusInterface
 */
export class QorusInterface {
  /**
   * Browse path for an interface
   */
  browsePath = '';

  constructor(browsePath: string) {
    this.browsePath = browsePath;
  }

  /**
   * A getter to get all jobs or a particular job from Qorus server job api
   * @param jobId Optional job id of a QorusJob
   * @returns List of jobs if job id is not provided, job data if the job id is provided, undefined if the job is not find
   */
  protected async _get<T>(param?: TQorusInterfaceIdentifier): Promise<T[] | T> {
    const requestPath = getRequestPath([this.browsePath ?? '', param?.toString() ?? '']);
    const response = await QorusRequest.get({ path: requestPath });

    const responseObj = response as QorusRequestResponse;
    const error = response as IErrorQorusRequestParams;

    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    const responseData: T = responseObj?.data as T;

    return responseData;
  }

  /**
   * Enable an interface on a Qorus server
   * @param param Id or name of the interface to be enabled
   * @returns EnableDisableResponse with jobId, name, version of the job
   */
  async enable(
    qorusInterfaceIdentifier: TQorusInterfaceIdentifier,
  ): Promise<IQorusEnableDisableTransformed | undefined> {
    const response = await this.makeActionCall('enable', qorusInterfaceIdentifier, true);
    return response as IQorusEnableDisableTransformed;
  }

  /**
   * Enable an interface on a Qorus server
   * @param param Id or name of the interface to be enabled
   * @returns EnableDisableResponse with jobId, name, version of the job
   */
  async disable(
    qorusInterfaceIdentifier: TQorusInterfaceIdentifier,
  ): Promise<IQorusEnableDisableTransformed | undefined> {
    const response = await this.makeActionCall('enable', qorusInterfaceIdentifier, true);
    return response as IQorusEnableDisableTransformed;
  }

  /**
   * Kill an interface processes on a Qorus server
   * @param param Id or name of the interface to be enabled
   * @returns EnableDisableResponse with jobId, name, version of the job
   */
  async kill(qorusInterfaceIdentifier: TQorusInterfaceIdentifier) {
    const response = await this.makeActionCall('kill', qorusInterfaceIdentifier, true, 'post');
    return response as IQorusInterfaceKill;
  }

  /**
   * A helper method to create a action call to an Qorus server interface
   * @param param Id or name of the interface to be enabled
   * @returns Response from the action call, if the response has variable id names ex:'jobid', it
   * will return a transformed result with the variable id name changed to just "id"
   */
  protected async makeActionCall(
    actionName: string,
    qorusInterfaceIdentifier: TQorusInterfaceIdentifier,
    transformResponse = false,
    requestType: 'post' | 'put' = 'put',
  ): Promise<
    | IQorusInterfaceEnableDisableResponse
    | IQorusEnableDisableTransformed
    | IQorusInterfaceKill
    | Record<string, string | number | boolean>
    | undefined
  > {
    if (requestType) {
    }
    const requestPath: string = getRequestPath([this.browsePath, qorusInterfaceIdentifier?.toString()]);
    const requestParams = {
      action: actionName,
    };
    const response = await QorusRequest[requestType]({ path: requestPath, params: requestParams });
    const error = response as IErrorQorusRequestParams;
    if (error.status) {
      throw new ErrorQorusRequest(error);
    }
    const responseAsData = response as QorusRequestResponse;
    const responseObj = responseAsData.data as IQorusInterfaceEnableDisableResponse;
    return transformResponse ? this.transformInterface(responseObj) : responseObj;
  }

  protected transformInterface(
    interfaceEnableDisableResponse: IQorusInterfaceEnableDisableResponse,
  ): IQorusEnableDisableTransformed | undefined {
    if (
      interfaceEnableDisableResponse.hasOwnProperty('jobid') ||
      interfaceEnableDisableResponse.hasOwnProperty('workflowid')
    ) {
      const id = interfaceEnableDisableResponse.jobid ?? interfaceEnableDisableResponse.workflowid ?? '';
      const transformed: IQorusEnableDisableTransformed = {
        id,
        name: interfaceEnableDisableResponse.name,
        version: interfaceEnableDisableResponse.version,
        info: interfaceEnableDisableResponse.info,
      };
      return transformed;
    } else return undefined;
  }
}

/**
 *  Id or name of an Qorus interface
 */
export type TQorusInterfaceIdentifier = number | TInterfaceIdentifierName;

/**
 * Name of an Qorus interface
 */
export type TInterfaceIdentifierName = string;

export interface IQorusInterfaceKill {
  status: string;
  code: number;
}

/**
 * Transformed object to provide a general hash for the enable and disable action
 * for an Qorus server interface
 */
export interface IQorusEnableDisableTransformed {
  /**
   * Id of the interface
   */
  id: string;

  /**
   * Name of the interface
   */
  name: string;

  /**
   * Version of the interface
   */
  version: string;

  /**
   * Info about the interface after action call
   */
  info: string;
}

export interface IQorusInterfaceEnableDisableResponse {
  /**
   * Id of the job that has been enabled
   */
  jobid?: string;

  /**
   * Id of the workflow
   */
  workflowid?: string;

  /**
   * Name of the job that has been enabled
   */
  name: string;

  /**
   * Version of the job that has been enabled
   */
  version: string;

  /**
   * Info of the job that has been enabled
   */
  info: string;
}
