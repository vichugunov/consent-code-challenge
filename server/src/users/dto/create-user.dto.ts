import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    type: String,
    format: 'email'
  })
  email: string
}