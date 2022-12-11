import { createVar, style } from '@vanilla-extract/css'

const highlightColor = createVar()

const highlightedText = style({
  color: highlightColor,
})

export const textHighlightStyles = {
  highlightedText,
}

export const textHighlightVars = {
  highlightColor,
}
