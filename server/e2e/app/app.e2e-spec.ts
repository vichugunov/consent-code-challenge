/// <reference types="@types/jest" />

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import * as path from 'path'

describe('E2E', () => {
  let app: INestApplication

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = modRef.createNestApplication()
    await app.init()
  })

  it('should throw 422 if email is not valid', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'bla-bla'})
      .expect(422)

  })

  afterAll(async () => {
    await app.close()
  })
})