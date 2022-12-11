import { CSSProperties } from '@vanilla-extract/css'
import { TypographyVariant } from '../types'

export function typography(variant: TypographyVariant): CSSProperties {
  switch (variant) {
    case 'title':
      return {
        fontSize: 20,
        lineHeight: '24px',
        fontWeight: 700,
      }

    case 'body':
      return {
        fontSize: 13,
        lineHeight: '16px',
        fontWeight: 500,
      }

    case 'caption':
      return {
        fontSize: 11,
        lineHeight: '12px',
        fontWeight: 500,
      }

    default:
      return {}
  }
}
