import { style } from '@vanilla-extract/css'
import { typography } from '~/styles'

const titleInput = style({
  ...typography('title'),
})

export const createEventDrawerStyles = {
  titleInput,
}
