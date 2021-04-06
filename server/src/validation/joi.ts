import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException } from '@nestjs/common'
import { ObjectSchema } from 'joi'

declare type ObjectType<T> = {
  new (response: string | Record<string, any>): T;
};

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema, private ExceptionClass: ObjectType<HttpException> = BadRequestException) {
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new this.ExceptionClass('Validation failed');
    }
    return value;
  }
}