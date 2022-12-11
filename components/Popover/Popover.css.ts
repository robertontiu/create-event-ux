import { createVar, style } from '@vanilla-extract/css'
import { color, layer } from '~/styles'

const overlayTop = createVar()
const overlayLeft = createVar()
const overlayWidth = createVar()

const host = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: layer('drawer'),
  pointerEvents: 'none',
  overflow: 'hidden',
})

const root = style({})

const overlay = style({
  position: 'absolute',
  top: overlayTop,
  left: overlayLeft,
  width: overlayWidth,
  boxShadow: `0px 20px 30px 1px ${color(['shadow', 0.1])}, 0px 2px 8px ${color([
    'shadow',
    0.2,
  ])}`,
})

export const popoverStyles = {
  host,
  root,
  overlay,
}

export const popoverVars = {
  overlayTop,
  overlayLeft,
  overlayWidth,
}
