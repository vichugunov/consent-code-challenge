import { Body, Controller, Delete, Get, Param, Post, UsePipes } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { Event } from './event.entity'
import { EventsService } from './events.service'
import { JoiValidationPipe } from '../validation/joi'
import { UnprocessableException } from '../exceptions/unprocessable.exception'
import { createEventSchema } from './validation/create-event.schema'
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiCreatedResponse({
    type: [Event]
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableException
  })
  @Post()
  @UsePipes(new JoiValidationPipe(createEventSchema, UnprocessableException))
  create(@Body() createEventDto: CreateEventDto): Promise<Event[]> {
    return this.eventsService.create(createEventDto)
  }

  @ApiOkResponse({
    type: [Event]
  })
  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll()
  }
}