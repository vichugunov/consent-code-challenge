import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateEventDto } from './dto/create-event.dto'
import { Event } from './event.entity'
import { User } from './../users/user.entity'
import { DbService } from 'src/db/db.service'
import { UnprocessableException } from '../exceptions/unprocessable.exception'

@Injectable()
export class EventsService {
  constructor(
    private readonly db: DbService
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event[]> {
    const dt = new Date()
    const user = await this.db.users.findOne({id: createEventDto.user.id})
    if (!user) {
      throw new UnprocessableException('User with provided id not found')
    }

    const promises = createEventDto.consents.map(consent => {
      const event = new Event()
      event.timestamp = dt
      event.enabled = consent.enabled
      event.type = consent.id
      event.user = user
      return this.db.events.save(event)
    })

    return Promise.all(promises)
  }

  async findAll(): Promise<Event[]> {
    return this.db.events.find()
  }
}