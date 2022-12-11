import { useEffect, useLayoutEffect, useMemo } from 'react'
import { drawerStyles } from './Drawer.css'

export function useDrawerPortalElement(layerIndex = 0) {
  const hostElement = useMemo(getOrCreateHostElement, [])
  const portalElement = useMemo(
    () => createPortalElement(hostElement),
    [hostElement]
  )

  // Set layer index on initial render and when the `layerIndex` changes
  useLayoutEffect(() => {
    portalElement.style.zIndex = layerIndex.toString()
  }, [portalElement, layerIndex])

  // Remove portal element from DOM on unmount
  useEffect(
    () => () => {
      hostElement.removeChild(portalElement)
    },
    [hostElement, portalElement]
  )

  return portalElement
}

const HOST_ELEMENT_ID = 'drawer-host'

function getOrCreateHostElement() {
  const main = document.querySelector('main')
  if (!main) {
    throw new Error('Unable to find main element.')
  }

  let host = main.querySelector(`:scope > #${HOST_ELEMENT_ID}`)
  if (!host) {
    host = document.createElement('div')
    host.id = HOST_ELEMENT_ID
    host.className = drawerStyles.host
    main.appendChild(host)
  }

  return host as HTMLElement
}

function createPortalElement(host: HTMLElement) {
  const portal = document.createElement('div')
  host.appendChild(portal)
  return portal as HTMLElement
}
