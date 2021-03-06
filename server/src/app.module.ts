import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { EventsModule } from './events/events.module'
import { DatabaseModule } from './db/db.module'

@Module({
  imports: [
    UsersModule,
    EventsModule,
    DatabaseModule
  ],
})
export class AppModule {}