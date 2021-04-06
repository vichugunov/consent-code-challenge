import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { IEventResponse } from 'src/events/interfaces/event-response.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { IUserResponse } from './interfaces/users-response.interface'
import { User } from './user.entity'
import { Event } from './../events/event.entity'

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DbService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const user = new User()
    user.email = createUserDto.email
    const savedUser = await this.db.users.save(user)

    return {
      ...savedUser,
      consents: []
    }
  }

  async getGroupedConsents(user: User): Promise<IEventResponse[]> {
    const events = this.db.events
                    .createQueryBuilder('events')
                    .select('events.type', 'id')
                    .addSelect('events.enabled', 'enabled')
                    .innerJoinAndSelect(subQuery => {
                      return subQuery
                             .select('type')
                             .addSelect('MAX(timestamp)', 'timestamp')
                             .from(Event, 'events')
                             .groupBy('type')
                    }, 'last_events', 'events."type" = last_events."type"')
                    .where('events."timestamp" = last_events."timestamp"')
                    .andWhere('user_id = :id', { id: user.id})
                    .getRawMany()
    return events
  }

  async findAll(): Promise<IUserResponse[]> {
    const users = await this.db.users.find()
    const userConsentPromises = users.map(user => this.getGroupedConsents(user))
    const userConsents = await Promise.all(userConsentPromises)

    return userConsents.map((consents, idx) => {
      const user = users[idx]
      return {
        id: user.id,
        email: user.email,
        consents
      }
    })
  }

  findOne(id: string): Promise<User> {
    return this.db.users.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.db.users.delete(id)
  }
}