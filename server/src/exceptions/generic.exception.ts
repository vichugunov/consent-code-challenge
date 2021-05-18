import { HttpException, HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger';

export class GenericException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status)
  }

  @ApiProperty({
    type: Number,
  })
  statusCode: HttpStatus

  @ApiProperty({
    type: String,
    description: 'Error description'
  })
  message: string

  @ApiProperty({
    type: String,
    description: 'Error type',
  })
  error: string
}