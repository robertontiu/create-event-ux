import {
  ComplexStyleRule,
  createVar,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { typography } from '~/styles'

const color = createVar()
const numberOfLines = createVar()

const root = style({
  color,
})

const rootVariants = styleVariants({
  title: typography('title'),
  body: typography('body'),
  caption: typography('caption'),
})

const rootAlignments = styleVariants({
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },
})

const rootClamp = style(
  // @TODO:
  // -webkit-box-orient is deprecated and support will be removed
  // in the near future
  {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': numberOfLines,
    '-webkit-box-orient': 'vertical',
  } as ComplexStyleRule
)

export const typographyStyles = {
  root,
  rootVariants,
  rootAlignments,
  rootClamp,
}

export const typographyVars = {
  color,
  numberOfLines,
}
