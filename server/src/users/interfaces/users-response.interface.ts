import { ApiProperty } from '@nestjs/swagger'
import { EventResponse, IEventResponse } from './../../events/interfaces/event-response.interface'

export interface IUserResponse {
  email: string
  id: string
  consents: IEventResponse[]
}

export class UserResponse implements IUserResponse {
  @ApiProperty({
    type: String,
    format: 'email'
  })
  email: string

  @ApiProperty({
    type: String,
    format: 'uuid'
  })
  id: string

  @ApiProperty({
    type: [EventResponse]
  })
  consents: EventResponse[]
}