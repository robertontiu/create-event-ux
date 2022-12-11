import { createVar, style } from '@vanilla-extract/css'
import { color, layer, spacing } from '~/styles'

const width = createVar()

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

const root = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width,
  height: '100vh',
  transform: 'translate3d(100%, 0, 0)',
  transition: 'transform 0.3s ease-in-out',
  backgroundColor: color('background'),
  boxShadow: `0px 0.5px 1px 0.5px ${color(['shadow', 0.1])}`,
})

const rootOpen = style({
  transform: 'translate3d(0, 0, 0)',
})

const contentContainer = style({
  padding: spacing(24, 17),
  maxHeight: '100%',
  overflowY: 'auto',
})

export const drawerStyles = {
  host,
  root,
  rootOpen,
  contentContainer,
}

export const drawerVars = {
  width,
}
