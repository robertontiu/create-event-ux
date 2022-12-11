import { style } from '@vanilla-extract/css'

const root = style({
  cursor: 'pointer',
  userSelect: 'none',
})

const rootDisabled = style({
  cursor: 'no-drop',
  opacity: 0.6,
})

export const pressableStyles = {
  root,
  rootDisabled,
}
