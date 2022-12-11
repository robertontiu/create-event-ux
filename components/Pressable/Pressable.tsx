import clsx from 'clsx'
import React, { FC, HTMLAttributes } from 'react'
import Ripples from 'react-ripples'
import { pressableStyles } from './Pressable.css'

export type PressableProps = HTMLAttributes<HTMLElement> & {
  /**
   * @default false
   */
  disabled?: boolean
}

export const Pressable: FC<PressableProps> = ({
  className,
  disabled = false,
  children,
  onClick,
  ...restProps
}) => {
  if (disabled) {
    return (
      <div
        className={clsx(
          pressableStyles.root,
          pressableStyles.rootDisabled,
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    )
  }

  return (
    <Ripples
      className={clsx(pressableStyles.root, className)}
      onClick={(e) => {
        if (!disabled) {
          onClick?.(e)
        }
      }}
      {...restProps}
    >
      {children}
    </Ripples>
  )
}
