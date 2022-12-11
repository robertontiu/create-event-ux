import React, { FC, useState } from 'react'
import { Drawer, DrawerProps } from '../Drawer'
import { UserSuggestionInput } from '../UserSuggestionInput'
import { createEventDrawerStyles } from './CreateEventDrawer.css'

export type CreateEventDrawerProps = Omit<DrawerProps, 'width'>

export const CreateEventDrawer: FC<CreateEventDrawerProps> = ({
  open,
  onTransitionEnd,
  ...restProps
}) => {
  const [title, setTitle] = useState('')
  const [autoFocus, setAutoFocus] = useState(false)

  return (
    <Drawer
      width={'max(25vw, 320px)'}
      open={open}
      onTransitionEnd={() => {
        setAutoFocus(open)
        onTransitionEnd?.()
      }}
      {...restProps}
    >
      <UserSuggestionInput
        inputClassName={createEventDrawerStyles.titleInput}
        placeholder={'Event name'}
        value={title}
        minQueryLength={3}
        autoFocus={autoFocus}
        onChange={setTitle}
        onSelectUser={(user) => console.log(user)}
      />
    </Drawer>
  )
}
