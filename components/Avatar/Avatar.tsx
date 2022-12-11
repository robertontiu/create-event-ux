import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'
import React, { FC } from 'react'
import { Typography } from '../Typography'
import { avatarStyles, avatarVars } from './Avatar.css'

export type AvatarProps = {
  className?: string
  size: number
  title: string
  src?: string
}

export const Avatar: FC<AvatarProps> = ({ className, size, title, src }) => {
  const renderContent = () => {
    if (typeof src === 'string') {
      return <img className={avatarStyles.image} src={src} alt={title} />
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
