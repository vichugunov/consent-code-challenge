import { Test, TestingModule } from '@nestjs/testing'
import { DbService } from './db.service'
import { mockRepository } from '../test-utils/mock-repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import { Event } from '../events/event.entity'

describe('DbService', () => {
  let service: DbService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository()
        },
        {
          provide: getRepositoryToken(Event),
          useValue: mockRepository()
        },
        DbService
    ],
    }).compile()

    service = moduleRef.get<DbService>(DbService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})