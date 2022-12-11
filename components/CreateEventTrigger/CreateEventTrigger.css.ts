import { style } from '@vanilla-extract/css'
import { color } from '~/styles'

const root = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color('surface'),
  userSelect: 'none',
})

const text = style({
  textShadow: `1px 1px ${color(['shadow', 0.01])}`,
})

export const createEventTriggerStyles = {
  root,
  text,
}
