import { faker } from '@faker-js/faker'
import { User } from './types'
import { USERS } from './users'

export const USER_AVAILABILITY: Record<User['id'], boolean> =
  Object.fromEntries(USERS.map((user) => [user.id, faker.datatype.boolean()]))
