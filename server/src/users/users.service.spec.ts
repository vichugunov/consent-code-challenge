import { Test, TestingModule } from '@nestjs/testing'
import { DbService } from '../db/db.service'
import { UsersService } from './users.service'
import { mockRepository } from '../test-utils/mock-repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import { Event, EventTypeEnum } from '../events/event.entity'
import { UsersController } from './users.controller'
import { CreateUserDto } from './dto/create-user.dto'
import { UnprocessableException } from '../exceptions/unprocessable.exception'
import { NotFoundException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

const dbMock = {
  users: mockRepository(),
  events: mockRepository()
}

const createDtoExample = new CreateUserDto()
createDtoExample.email = 'test@gmail.com'
const testId = uuidv4()

const user = new User()
user.id = testId
user.email = createDtoExample.email


const event = new Event()
event.id = uuidv4()
event.type = EventTypeEnum.Email
event.enabled = true
event.user = user

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: DbService,
          useValue: dbMock
        },
        UsersService
    ],
    }).compile()

    service = moduleRef.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should throw if user found', async() => {
    dbMock.users.count.mockResolvedValueOnce(1)
    expect.assertions(1)

    try {
      await service.create(createDtoExample)
    } catch (e) {
      expect(e).toBeInstanceOf(UnprocessableException)
    }
  })

  it('should save if user does not exist', async() => {
    dbMock.users.count.mockResolvedValueOnce(0)
    const result = await service.create(createDtoExample)
    expect(dbMock.users.save).toBeCalledTimes(1)
    expect(result.consents).toHaveLength(0)
  })

  it('should throw on remove if user does not exist', async() => {
    dbMock.users.findOne.mockResolvedValueOnce(null)
    try {
      await service.remove(testId)
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException)
    }
  })

  it('should delete a user and all associated events', async() => {
    dbMock.users.findOne.mockResolvedValueOnce(user)
    dbMock.events.delete.mockResolvedValueOnce(null)
    dbMock.users.delete.mockResolvedValueOnce(null)

    await service.remove(testId)
    expect(dbMock.events.delete).toBeCalledWith({ user })
    expect(dbMock.users.delete).toBeCalledWith(user.id)
  })
})