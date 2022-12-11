import { createVar, style } from '@vanilla-extract/css'

const activeOpacity = createVar()
const disabledOpacity = createVar()

const root = style({
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  appearance: 'none',
  cursor: 'pointer',
})

const rootActive = style({
  opacity: activeOpacity,
})

const rootDisabled = style({
  opacity: disabledOpacity,
  cursor: 'no-drop',
})

export const pressableOpacityStyles = {
  root,
  rootActive,
  rootDisabled,
}

export const pressableOpacityVars = {
  activeOpacity,
  disabledOpacity,
}
