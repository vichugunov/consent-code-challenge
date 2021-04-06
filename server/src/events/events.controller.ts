import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { Event } from './event.entity'
import { EventsService } from './events.service'

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  // TODO: validate
  create(@Body() createEventDtO: CreateEventDto): Promise<Event[]> {
    return this.eventsService.create(createEventDtO)
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll()
  }
}