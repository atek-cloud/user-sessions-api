import { rpc, createRpcServer } from '@atek-cloud/node-rpc'

export const ID = 'atek.cloud/user-sessions-api'

export interface UserSessionsApi {
  // Get the current session
  whoami (): Promise<UserSession>

  // Create a new session
  login (creds: UserCreds): Promise<UserSession>

  // End the current session
  logout (): Promise<void>
}

export class UserSession {
  isActive: boolean = false;
  username: string = '';
  static schema = {
    type: 'object',
    properties: {
      isActive: {type: 'boolean'},
      username: {type: 'string'},
    },
    required: ['isActive']
  }
}

export class UserCreds {
  username: string = '';
  password: string = '';
  static schema = {
    type: 'object',
    properties: {
      username: {type: 'string'},
      password: {type: 'string'}
    },
    required: ['username', 'password']
  }
}

export function createClient () {
  return rpc<UserSessionsApi>(ID)
}

export function createServer (handlers: any) {
  return createRpcServer(handlers, {
    whoami: {
      response: UserSession
    },
    login: {
      params: [UserCreds],
      response: UserSession
    },
    logout: {}
  })
}

export default createClient()