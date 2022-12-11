import { style } from '@vanilla-extract/css'

const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

const item = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  justifyContent: 'space-between',
  alignItems: 'center',
})

const itemContent = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
})

const itemAvatarContainer = style({
  flex: 0,
})

const itemInfo = style({
  flex: 1,
  minWidth: 0,
})

const itemStatus = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 6,
  alignItems: 'center',
})

const itemStatusIconContainer = style({
  flex: 0,
})

const itemActions = style({
  flex: 0,
})

const showMoreButton = style({
  display: 'inline-flex',
  flexDirection: 'row',
  padding: 4,
})

export const attendeesListStyles = {
  root,
  contentContainer,
  item,
  itemContent,
  itemAvatarContainer,
  itemInfo,
  itemStatus,
  itemStatusIconContainer,
  itemActions,
  showMoreButton,
}
