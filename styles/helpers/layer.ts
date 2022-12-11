import { Layer } from '../types'

/**
 * Returns a z-index value for a given layer and offset index
 */
export function layer(layerName: Layer, index = 0) {
  return LAYER_BASE_INDICES[layerName] + index
}

const LAYER_BASE_INDICES: Record<Layer, number> = {
  flat: 0,
  drawer: 1000,
  popover: 2000,
}
