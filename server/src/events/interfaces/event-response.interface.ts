import { EventTypeEnum } from './../event.entity'

export interface IEventResponse {
  id: EventTypeEnum
  enabled: boolean
}