import { faker } from '@faker-js/faker'
import times from 'lodash/times'
import { User } from './types'

export const USERS = times(100, makeUser)

function makeUser(): User {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatarUrl: faker.image.avatar(),
  }
}
