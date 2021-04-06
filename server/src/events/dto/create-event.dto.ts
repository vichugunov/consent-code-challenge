import { EventTypeEnum } from './../event.entity'

class UserIdentifier {
  id: string
}

class Consent {
  id: EventTypeEnum
  enabled: boolean
}

export class CreateEventDto {
  user: UserIdentifier
  consents: Consent[]
}