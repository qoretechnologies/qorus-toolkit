export const errorCodes: ErrorCodes = {
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

export type ErrorCodes = Record<string, ErrorCode>;

export interface ErrorCode {
  code?: number;
  name?: string;
}
