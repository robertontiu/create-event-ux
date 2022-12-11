import { createVar, style } from '@vanilla-extract/css'

const color = createVar()
const size = createVar()

const root = style({
  color,
  width: size,
  height: size,
})

export const iconVars = {
  color,
  size,
}

export const iconStyles = {
  root,
}
