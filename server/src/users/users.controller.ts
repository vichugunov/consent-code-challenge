import { Body, Controller, Delete, Get, Param, Post, UsePipes } from '@nestjs/common'
import { UnprocessableException } from '../exceptions/unprocessable.exception'
import { JoiValidationPipe } from '../validation/joi'
import { CreateUserDto } from './dto/create-user.dto'
import { IUserResponse } from './interfaces/users-response.interface'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { createUserSchema } from './validation/create-user.schema'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema, UnprocessableException))
  create(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(): Promise<IUserResponse[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }
}