import { ApiProperty } from '@nestjs/swagger'
import { EventTypeEnum } from './../event.entity'

export interface IEventResponse {
  id: EventTypeEnum
  enabled: boolean
}

export class EventResponse implements IEventResponse {
  @ApiProperty({
    type: String,
    enum: EventTypeEnum
  })
  id: EventTypeEnum

  @ApiProperty()
  enabled: boolean
}