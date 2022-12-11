import clsx from 'clsx'
import React, { FC, useRef } from 'react'
import { User, USERS } from '~/data'
import { Avatar } from '../Avatar'
import { SuggestionInput, SuggestionInputProps } from '../SuggestionInput'
import { TextHighlight } from '../TextHighlight'
import { userSuggestionInputStyles } from './UserSuggestionInput.css'

export type UserSuggestionInputProps = Pick<
  SuggestionInputProps<User>,
  | 'className'
  | 'inputClassName'
  | 'placeholder'
  | 'autoFocus'
  | 'value'
  | 'onFocus'
  | 'onBlur'
  | 'onChange'
> & {
  /**
   * @default 3
   */
  minQueryLength?: number
  onSelectUser: SuggestionInputProps<User>['onSelectSuggestion']
}

export const UserSuggestionInput: FC<UserSuggestionInputProps> = ({
  minQueryLength = 3,
  onSelectUser,
  ...restProps
}) => {
  const queryRef = useRef('')

  return (
    <SuggestionInput
      suggestionOverlayClassName={userSuggestionInputStyles.overlayContainer}
      suggestionListClassName={userSuggestionInputStyles.usersList}
      getSuggestions={(query) => {
        queryRef.current = query
        return query.length >= minQueryLength ? getUsersByQuery(query) : []
      }}
      renderSuggestion={({ item: user, highlighted, onClick, onMouseOver }) => (
        <div
          className={clsx(
            userSuggestionInputStyles.userItem,
            highlighted && userSuggestionInputStyles.userItemHighlighted
          )}
          onClick={onClick}
          onMouseOver={onMouseOver}
        >
          <div className={userSuggestionInputStyles.userItemAvatarContainer}>
            <Avatar size={24} src={user.avatarUrl} title={user.name} />
          </div>
          <div className={userSuggestionInputStyles.userItemInfo}>
            <TextHighlight
              as={'div'}
              variant={'body'}
              content={user.name}
              highlight={queryRef.current}
              numberOfLines={1}
            />
            <TextHighlight
              as={'div'}
              variant={'caption'}
              color={'text-secondary'}
              content={user.email}
              highlight={queryRef.current}
              numberOfLines={1}
            />
          </div>
        </div>
      )}
      onSelectSuggestion={onSelectUser}
      {...restProps}
    />
  )
}

function getUsersByQuery(query: string) {
  return USERS.filter(
    (user) =>
      user.name
        .split(/\s/g)
        .some((namePart) =>
          namePart.toLowerCase().startsWith(query.toLowerCase())
        ) || user.email.toLowerCase().startsWith(query.toLowerCase())
  )
}
