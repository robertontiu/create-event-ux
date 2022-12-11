import { SpacingArgs } from '../types'

/**
 * Shorthand function to type in CSS spacing values
 */
export function spacing(...args: SpacingArgs) {
  return args.map((value) => `${value}px`).join(' ')
}
