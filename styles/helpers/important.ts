/**
 * A convenience mixin for applying the `!important` modifier to a style value
 */
export function important<T extends string>(value: T): T {
  return `${value} !important` as T
}
