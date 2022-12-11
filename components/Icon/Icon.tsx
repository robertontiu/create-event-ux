import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'
import type { ComponentType, FC, HTMLAttributes } from 'react'
import { color, ColorProp } from '~/styles'
import { iconStyles, iconVars } from './Icon.css'

export type IconComponentProps = {
  className?: string
  style?: HTMLAttributes<HTMLElement>['style']
}

export type IconProps = {
  className?: string
  size: number
  color: ColorProp
  component: ComponentType<IconComponentProps>
}

export const Icon: FC<IconProps> = ({
  size,
  color: colorProp,
  className,
  component: Component,
}) => {
  return (
    <Component
      className={clsx(iconStyles.root, className)}
      style={assignInlineVars({
        [iconVars.size]: `${size}px`,
        [iconVars.color]: color(colorProp),
      })}
    />
  )
}
