import React, { FC } from 'react'
import { color, ColorProp } from '~/styles'
import escapeRegExp from 'lodash/escapeRegExp'
import { Typography, TypographyProps } from '../Typography'
import { textHighlightStyles, textHighlightVars } from './TextHighlight.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

export type TextHighlightProps = Omit<TypographyProps, 'children'> & {
  /**
   * All text content
   */
  content: string

  /**
   * Text to highlight
   */
  highlight: string

  /**
   * @default 'primary'
   */
  highlightColor?: ColorProp
}

export const TextHighlight: FC<TextHighlightProps> = ({
  content,
  highlight,
  highlightColor = 'primary',
  style,
  ...restProps
}) => {
  return (
    <Typography
      style={{
        ...assignInlineVars({
          [textHighlightVars.highlightColor]: color(highlightColor),
        }),
        ...style,
      }}
      {...restProps}
    >
      {getTextParts(content, highlight).map((part, index) => (
        <span
          key={index}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? textHighlightStyles.highlightedText
              : undefined
          }
        >
          {part}
        </span>
      ))}
    </Typography>
  )
}

function getTextParts(content: string, highlight: string) {
  if (highlight.length === 0) {
    return [content]
  }

  const parts = [] as string[]
  const regExp = new RegExp(`(${escapeRegExp(highlight)})`, 'ig')
  let match = regExp.exec(content)

  while (match) {
    parts.push(content.substring(0, match.index))
    parts.push(match[0])

    content = content.substring(match.index + match[0].length)
    match = regExp.exec(content)
  }

  // Push remaining text
  if (content.length > 0) {
    parts.push(content)
  }

  return parts
}
