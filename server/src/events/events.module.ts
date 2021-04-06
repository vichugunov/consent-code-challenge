import { Module } from '@nestjs/common'
import { DatabaseModule } from '../db/db.module'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'

@Module({
  imports: [DatabaseModule],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [EventsService]
})
export class EventsModule {}