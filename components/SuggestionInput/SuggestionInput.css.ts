import { style } from '@vanilla-extract/css'
import { color, typography } from '~/styles'

const input = style({
  ...typography('body'),
  width: '100%',
  padding: 0,
  border: 'none',
  backgroundColor: color('background'),
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: color('text-muted'),
    },
  },
})

export const suggestionInputStyles = {
  input,
}
