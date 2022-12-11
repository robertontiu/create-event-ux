export type Color =
  | 'surface'
  | 'surface-shade'
  | 'background'
  | 'primary'
  | 'text'
  | 'text-secondary'
  | 'text-muted'
  | 'success'
  | 'shadow'

export type ColorArgs = [color: Color, alpha: number]

export type ColorProp = Color | ColorArgs

export type SpacingArg = number | string
export type SpacingArgs =
  | [SpacingArg]
  | [vertical: SpacingArg, horizontal: SpacingArg]
  | [top: SpacingArg, horizontal: SpacingArg, bottom: SpacingArg]
  | [top: SpacingArg, right: SpacingArg, bottom: SpacingArg, left: SpacingArg]

export type Layer = 'flat' | 'drawer' | 'popover'

export type TypographyVariant = 'title' | 'body' | 'caption'

export type Theme = {
  colors: Record<Color, string>
}
