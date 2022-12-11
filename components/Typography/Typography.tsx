import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'
import React, {
  ElementType,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'
import { color, ColorProp } from '~/styles'
import { typographyStyles, typographyVars } from './Typography.css'

export type TypographyProps = PropsWithChildren<{
  className?: string
  style?: HTMLAttributes<HTMLElement>['style']

  /**
   * Root element type
   * @default 'span'
   */
  as?: ElementType

  /**
   * @default 'body'
   */
  variant?: keyof typeof typographyStyles.rootVariants

  /**
   * @default 'left'
   */
  align?: keyof typeof typographyStyles.rootAlignments

  /**
   * When provided, the text will be truncated with an ellipsis after the specified number of lines.
   */
  numberOfLines?: number

  /**
   * @default 'text'
   */
  color?: ColorProp
}>

export const Typography: FC<TypographyProps> = ({
  className,
  as: Component = 'span',
  variant = 'body',
  align = 'left',
  numberOfLines,
  color: colorProp = 'text',
  children,
}) => {
  return (
    <Component
      className={clsx(
        typographyStyles.root,
        typographyStyles.rootVariants[variant],
        typographyStyles.rootAlignments[align],
        typeof numberOfLines === 'number' && typographyStyles.rootClamp,
        className
      )}
      style={assignInlineVars({
        [typographyVars.color]: color(colorProp),
        [typographyVars.numberOfLines]: numberOfLines?.toString() ?? '0',
      })}
    >
      {children}
    </Component>
  )
}
