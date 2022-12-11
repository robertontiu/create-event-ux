import React, { FC, useMemo, useState } from 'react'
import { User, USERS } from '~/data'
import { USER_AVAILABILITY } from '~/data/userAvailability'
import { AttendeesList } from '../AttendeesList'
import { Drawer, DrawerProps } from '../Drawer'
import { Typography } from '../Typography'
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
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const usersPool = useMemo(
    () =>
      USERS.filter(
        (user) => !selectedUsers.some((candidate) => candidate.id === user.id)
      ),
    [selectedUsers]
  )

  const attendees = useMemo(
    () =>
      selectedUsers.map((user) => ({
        user,
        available: USER_AVAILABILITY[user.id],
      })),
    [selectedUsers]
  )

  return (
    <Drawer
      width={'max(25vw, 320px)'}
      contentContainerClassName={createEventDrawerStyles.contentContainer}
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
        users={usersPool}
        minQueryLength={3}
        autoFocus={autoFocus}
        onChange={setTitle}
        onSelectUser={(user) =>
          setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user])
        }
      />
      <div className={createEventDrawerStyles.attendeesContainer}>
        <Typography variant={'body'} color={'text-secondary'}>
          Attendees
          {selectedUsers.length > 0 ? ` (${selectedUsers.length})` : ''}
        </Typography>
        <AttendeesList
          items={attendees}
          maxVisibleItems={3}
          onRemove={(item) =>
            setSelectedUsers((prevSelectedUsers) =>
              prevSelectedUsers.filter((user) => user.id !== item.user.id)
            )
          }
        />
      </div>
    </Drawer>
  )
}
