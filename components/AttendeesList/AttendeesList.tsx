import clsx from 'clsx'
import { FC, useMemo, useState } from 'react'
import { User } from '~/data'
import { Avatar } from '../Avatar'
import { Collapsible } from '../Collapsible'
import { Icon } from '../Icon'
import { PressableOpacity } from '../PressableOpacity'
import { Typography } from '../Typography'
import { attendeesListStyles } from './AttendeesList.css'
import { CheckCircle, Slash, XCircle } from 'react-feather'

export type AttendeeListItem = {
  user: User
  available: boolean
}

export type AttendeesListProps = {
  className?: string
  contentContainerClassName?: string
  items: AttendeeListItem[]
  /**
   * @default items.length
   */
  maxVisibleItems?: number
  onRemove: (item: AttendeeListItem) => void
}

export const AttendeesList: FC<AttendeesListProps> = ({
  className,
  contentContainerClassName,
  items,
  maxVisibleItems = items.length,
  onRemove,
}) => {
  const persistentItems = useMemo(
    () => items.slice(0, maxVisibleItems),
    [items, maxVisibleItems]
  )
  const overflowItems = useMemo(
    () => items.slice(maxVisibleItems),
    [items, maxVisibleItems]
  )
  const [isOverflowExpanded, setIsOverflowExpanded] = useState(false)

  const renderItem = (item: AttendeeListItem) => {
    return (
      <div key={item.user.id} className={attendeesListStyles.item}>
        <div className={attendeesListStyles.itemContent}>
          <div className={attendeesListStyles.itemAvatarContainer}>
            <Avatar
              size={24}
              title={item.user.name}
              src={item.user.avatarUrl}
            />
          </div>
          <div className={attendeesListStyles.itemInfo}>
            <Typography>{item.user.name}</Typography>
            <div className={attendeesListStyles.itemStatus}>
              <div className={attendeesListStyles.itemStatusIconContainer}>
                <Icon
                  size={12}
                  color={item.available ? 'success' : 'text-secondary'}
                  component={item.available ? CheckCircle : Slash}
                />
              </div>
              <Typography variant={'caption'} color={'text-secondary'}>
                {item.available ? 'Available' : 'Unavailable'}
              </Typography>
            </div>
          </div>
        </div>
        <div className={attendeesListStyles.itemActions}>
          <PressableOpacity onClick={() => onRemove(item)}>
            <Icon size={16} color={'error'} component={XCircle} />
          </PressableOpacity>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(attendeesListStyles.root, className)}>
      <div
        className={clsx(
          attendeesListStyles.contentContainer,
          contentContainerClassName
        )}
      >
        {persistentItems.map(renderItem)}
        <Collapsible
          expanded={isOverflowExpanded}
          className={clsx(
            attendeesListStyles.contentContainer,
            contentContainerClassName
          )}
        >
          {overflowItems.map(renderItem)}
        </Collapsible>
      </div>
      {overflowItems.length > 0 && (
        <PressableOpacity
          className={attendeesListStyles.showMoreButton}
          onClick={() => setIsOverflowExpanded((prevExpanded) => !prevExpanded)}
        >
          <Typography color={'text-secondary'}>
            {isOverflowExpanded
              ? 'Show less'
              : `Show ${overflowItems.length} more`}
          </Typography>
        </PressableOpacity>
      )}
    </div>
  )
}
