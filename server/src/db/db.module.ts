import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { databaseConnections } from './database-connections'
import { Module } from '@nestjs/common'
import { User } from '../users/user.entity'
import { Event } from '../events/event.entity'
import { DbService } from './db.service'

@Module({
    imports: [
        ...databaseConnections,
        TypeOrmModule.forFeature([User, Event])
    ],
    providers: [
      DbService
    ],
    exports: [
      TypeOrmModule,
      DbService
    ]
})
export class DatabaseModule {}