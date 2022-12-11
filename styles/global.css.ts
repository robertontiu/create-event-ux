import { globalStyle } from '@vanilla-extract/css'
import { color } from './helpers'

globalStyle('main', {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: color('surface'),
})
