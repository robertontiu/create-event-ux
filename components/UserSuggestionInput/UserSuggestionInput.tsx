import clsx from 'clsx'
import escapeRegExp from 'lodash/escapeRegExp'
import React, { FC, useRef } from 'react'
import { User } from '~/data'
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
   * The pool of users
   */
  users: User[]

  /**
   * @default 3
   */
  minQueryLength?: number
  onSelectUser: SuggestionInputProps<User>['onSelectSuggestion']
}

export const UserSuggestionInput: FC<UserSuggestionInputProps> = ({
  users,
  minQueryLength = 3,
  onSelectUser,
  ...restProps
}) => {
  const queryRef = useRef('')

  return (
    <SuggestionInput
      suggestionOverlayClassName={userSuggestionInputStyles.overlayContainer}
      suggestionListClassName={userSuggestionInputStyles.usersList}
      suggestionKeyExtractor={(user) => user.id}
      suggestionAutocompleteExtractor={(user) => user.name}
      getSuggestions={(query) => {
        queryRef.current = query
        return query.length >= minQueryLength
          ? getUsersFilteredByQuery(users, query)
          : []
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

function getUsersFilteredByQuery(users: User[], query: string) {
  return users.filter((user) => {
    // Match by email address
    if (user.email.toLowerCase().startsWith(query.toLowerCase())) {
      return true
    }

    // Match by name
    // NOTE: Here we want to match case sensitive and we want the match to
    // be at the start of a word (either preceded by a space or the start of the string)
    const regExp = new RegExp(`(^|\\s)${escapeRegExp(query)}`)
    return regExp.test(user.name)
  })
}
