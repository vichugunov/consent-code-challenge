import { Test, TestingModule } from '@nestjs/testing'
import { DbService } from '../db/db.service'
import { EventsService } from './events.service'
import { mockRepository } from '../test-utils/mock-repository'
import { EventTypeEnum } from '../events/event.entity'
import { EventsController } from './events.controller'
import { CreateEventDto } from './dto/create-event.dto'
import { UnprocessableException } from '../exceptions/unprocessable.exception'
import { v4 as uuidv4 } from 'uuid'

const dbMock = {
  users: mockRepository(),
  events: mockRepository()
}

const createDtoExample = new CreateEventDto()
createDtoExample.user = { id: uuidv4() }
createDtoExample.consents = [
  {
    id: EventTypeEnum.Email,
    enabled: false
  },
  {
    id: EventTypeEnum.Sms,
    enabled: true
  }
]

describe('EventsService', () => {
  let service: EventsService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: DbService,
          useValue: dbMock
        },
        EventsService
    ],
    }).compile()

    service = moduleRef.get<EventsService>(EventsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should throw if user not found', async() => {
    dbMock.users.findOne.mockResolvedValueOnce(null)
    expect.assertions(1)

    try {
      await service.create(createDtoExample)
    } catch (e) {
      expect(e).toBeInstanceOf(UnprocessableException)
    }
  })

  it('should save if user found', async() => {
    dbMock.users.findOne.mockResolvedValueOnce({})
    expect.assertions(1)
    await service.create(createDtoExample)
    expect(dbMock.events.save).toBeCalledTimes(2)
  })
})