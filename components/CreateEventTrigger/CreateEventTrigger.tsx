import React, { FC } from 'react'
import { Typography } from '../Typography'
import { createEventTriggerStyles } from './CreateEventTrigger.css'

export type CreateEventTriggerProps = {
  onClick: () => void
}

export const CreateEventTrigger: FC<CreateEventTriggerProps> = ({
  onClick,
}) => {
  return (
    <div className={createEventTriggerStyles.root} onClick={onClick}>
      <Typography
        className={createEventTriggerStyles.text}
        variant={'title'}
        color={'text-muted'}
      >
        Click anywhere to start creating an event
      </Typography>
    </div>
  )
}
