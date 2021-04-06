import { IEventResponse } from './../../events/interfaces/event-response.interface'

export interface IUserResponse {
  email: string
  id: string
  consents: IEventResponse[]
}