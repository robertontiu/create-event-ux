import { style } from '@vanilla-extract/css'
import { typography } from '~/styles'

const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
})

const titleInput = style({
  ...typography('title'),
})

const attendeesContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: 32,
})

export const createEventDrawerStyles = {
  contentContainer,
  titleInput,
  attendeesContainer,
}
