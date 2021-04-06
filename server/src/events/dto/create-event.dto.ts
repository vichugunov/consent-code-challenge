class UserIdentifier {
  id: string
}

// TODO validation and enum
class Consent {
  id: string
  enabled: boolean
}

export class CreateEventDto {
  user: UserIdentifier
  consents: Consent[]
}