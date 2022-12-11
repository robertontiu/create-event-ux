import { createVar, style } from '@vanilla-extract/css'
import { color } from '~/styles'

const size = createVar()

const root = style({
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: color('surface'),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const image = style({
  flex: 0,
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
})

export const avatarStyles = {
  root,
  image,
}

export const avatarVars = {
  size,
}
