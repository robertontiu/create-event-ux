import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { useChangeEffect } from '~/hooks'
import { Typography } from '../Typography'
import { avatarStyles, avatarVars } from './Avatar.css'

export type AvatarProps = {
  className?: string
  size: number
  title: string
  src?: string
}

export const Avatar: FC<AvatarProps> = ({ className, size, title, src }) => {
  // If the image errored out then we will show initials instead
  const [isError, setIsError] = useState(false)

  // Reset the error state when the src changes
  useChangeEffect(src, () => {
    setIsError(false)
  })

  const renderContent = () => {
    if (!isError && typeof src === 'string') {
      return (
        <img
          className={avatarStyles.image}
          src={src}
          alt={title}
          onError={() => setIsError(true)}
        />
      )
    }

    return (
      <Typography variant={'caption'} color={'text-secondary'}>
        {getInitials(title)}
      </Typography>
    )
  }

  return (
    <div
      className={clsx(avatarStyles.root, className)}
      style={assignInlineVars({
        [avatarVars.size]: `${size}px`,
      })}
    >
      {renderContent()}
    </div>
  )
}

function getInitials(title: string) {
  return title
    .split(/\s/g)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}
