import { style } from '@vanilla-extract/css'
import { color } from '~/styles'

const overlayContainer = style({
  maxWidth: 230,
  borderRadius: 6,
})

const usersList = style({
  padding: 4,
  backgroundColor: color('background'),
  borderRadius: 6,
  maxHeight: 250,
})

const userItem = style({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  borderRadius: 6,
})

const userItemHighlighted = style({
  backgroundColor: color('surface-shade'),
})

const userItemAvatarContainer = style({
  flex: 0,
})

const userItemInfo = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const userSuggestionInputStyles = {
  overlayContainer,
  usersList,
  userItem,
  userItemHighlighted,
  userItemAvatarContainer,
  userItemInfo,
}
