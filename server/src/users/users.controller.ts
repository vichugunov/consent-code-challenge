import { Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Post, UsePipes } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { GenericException } from '../exceptions/generic.exception'
import { UnprocessableException } from '../exceptions/unprocessable.exception'
import { JoiValidationPipe } from '../validation/joi'
import { CreateUserDto } from './dto/create-user.dto'
import { UserResponse } from './interfaces/users-response.interface'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { createUserSchema } from './validation/create-user.schema'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    type: UserResponse
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableException
  })
  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema, UnprocessableException))
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(createUserDto)
  }

  @ApiOkResponse({
    type: [UserResponse]
  })
  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll()
  }

  @ApiOkResponse({
    type: UserResponse
  })
  @ApiNotFoundResponse({
    type: GenericException
  })
  @ApiBadRequestResponse({
    type: GenericException
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponse> {
    return this.usersService.findOne(id)
  }

  @ApiOkResponse()
  @ApiNotFoundResponse({
    type: GenericException
  })
  @ApiBadRequestResponse({
    type: GenericException
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id)
  }
}