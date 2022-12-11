import { faker } from '@faker-js/faker'
import times from 'lodash/times'
import { User } from './types'

export const USERS = times(1000, makeUser)

function makeUser(): User {
  return {
    id: faker.datatype.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
    avatarUrl: faker.image.avatar(),
  }
}
