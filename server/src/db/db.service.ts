import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import { Event } from '../events/event.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DbService {
    constructor(
        @InjectRepository(User)
        public readonly users: Repository<User>,

        @InjectRepository(Event)
        public readonly events: Repository<Event>,
    ) {

    }
}