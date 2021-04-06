import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { DatabaseModule } from '../db/db.module'

@Module({
  imports: [ DatabaseModule ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}