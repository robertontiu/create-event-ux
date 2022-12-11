import { useEffect, useState } from 'react'

export type UseCreatePortalElementOptions = {
  hostElementId: string
  hostElementClassName?: string
  /**
   * @default 0
   */
  layerIndex?: number
}

export function useCreatePortalElement({
  hostElementId,
  hostElementClassName,
  layerIndex = 0,
}: UseCreatePortalElementOptions) {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const host = getOrCreateHostElement({ hostElementId, hostElementClassName })
    const portal = createPortalElement(host)
    setElement(portal)
    return () => {
      host.removeChild(portal)
    }
  }, [hostElementId, hostElementClassName])

  // Update layer index
  useEffect(() => {
    if (element) {
      element.style.zIndex = layerIndex.toString()
    }
  }, [element, layerIndex])

  return element
}

function getOrCreateHostElement({
  hostElementId,
  hostElementClassName,
}: Pick<
  UseCreatePortalElementOptions,
  'hostElementId' | 'hostElementClassName'
>) {
  const main = document.querySelector('main')
  if (!main) {
    throw new Error('Unable to find main element.')
  }

  let host = main.querySelector(`:scope > #${hostElementId}`)
  if (!host) {
    host = document.createElement('div')
    host.id = hostElementId

    if (hostElementClassName) {
      host.className = hostElementClassName
    }

    main.appendChild(host)
  }

  return host as HTMLElement
}

function createPortalElement(host: HTMLElement) {
  const portal = document.createElement('div')
  host.appendChild(portal)
  return portal as HTMLElement
}
