import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'
import React, { ButtonHTMLAttributes, FC, useState } from 'react'
import {
  pressableOpacityStyles,
  pressableOpacityVars,
} from './PressableOpacity.css'

export type PressableOpacityProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * @default 0.2
   */
  activeOpacity?: number

  /**
   * @default 0.5
   */
  disabledOpacity?: number
}

export const PressableOpacity: FC<PressableOpacityProps> = ({
  activeOpacity = 0.2,
  disabledOpacity = 0.5,
  className,
  style,
  children,
  type = 'button',
  disabled,
  onMouseDown,
  onMouseUp,
  ...restProps
}) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <button
      type={type}
      className={clsx(
        pressableOpacityStyles.root,
        isActive && pressableOpacityStyles.rootActive,
        disabled && pressableOpacityStyles.rootDisabled,
        className
      )}
      style={{
        ...assignInlineVars({
          [pressableOpacityVars.activeOpacity]: activeOpacity.toString(),
          [pressableOpacityVars.disabledOpacity]: disabledOpacity.toString(),
        }),
        ...style,
      }}
      onMouseDown={(e) => {
        setIsActive(true)
        onMouseDown?.(e)
      }}
      onMouseUp={(e) => {
        setIsActive(false)
        onMouseUp?.(e)
      }}
      {...restProps}
    >
      {children}
    </button>
  )
}
