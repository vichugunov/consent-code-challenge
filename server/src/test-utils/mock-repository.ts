/// <reference types="@types/jest" />

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  count: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn()
}))