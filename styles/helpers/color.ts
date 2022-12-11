import rgba from 'color-rgba'
import { ColorProp } from '../types'

/**
 * Returns a CSS rgba color given the color name and alpha value.
 */
export function color(prop: ColorProp) {
  const [colorName, alpha] = typeof prop === 'string' ? [prop, 1.0] : prop

  const [r, g, b] = rgba(colorName) ?? [0, 0, 0]
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
