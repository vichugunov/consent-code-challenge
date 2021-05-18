import { ApiProperty } from '@nestjs/swagger'

import { EventTypeEnum } from './../event.entity'

class UserIdentifier {
  @ApiProperty({
    type: String,
    format: 'uuid'
  })
  id: string
}

class Consent {
  @ApiProperty({
    type: String,
    enum: EventTypeEnum
  })
  id: EventTypeEnum

  @ApiProperty()
  enabled: boolean
}

export class CreateEventDto {
  @ApiProperty()
  user: UserIdentifier

  @ApiProperty({type: [Consent]})
  consents: Consent[]
}