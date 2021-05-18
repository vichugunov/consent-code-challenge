import { HttpException, HttpStatus } from '@nestjs/common'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { GenericException } from './generic.exception'

export class UnprocessableException extends GenericException {
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @ApiProperty({
    type: Number,
    default: 422
  })
  statusCode: HttpStatus
}