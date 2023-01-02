export const errorCodes: TErrorCodes = {
  AUTHENTICATION: {
    code: 401,
    name: 'AUTHENTICATION-ERROR',
  },
  BAD_REQUEST: {
    code: 400,
    name: 'ERROR-BAD-REQUEST',
  },
  NOT_FOUND: {
    code: 404,
    name: 'NOT-FOUND-ERROR',
  },
  INTERNAL_SERVER: {
    code: 500,
    name: 'INTERNAL-SERVER-ERROR',
  },
  GENERAL: {
    code: undefined,
    name: 'ERROR',
  },
  INTERNAL: {
    code: undefined,
    name: 'INTERNAL-ERROR',
  },
};

type TErrorCodes = Record<string, IErrorCode>;

export interface IErrorCode {
  code?: number;
  name?: string;
}
