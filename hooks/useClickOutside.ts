import { useEffect } from 'react'
import { isDomNodeParentOf } from '~/utils/isDomNodeParentOf'
import { useEvent } from './useEvent'

export type UseClickOutsideOptions = {
  parentElement: HTMLElement | undefined | null
  /**
   * @default true
   */
  enabled?: boolean
  callback: () => void
  /**
   * Optional exclude filter
   * When returning true the click will be considered "inside"
   */
  excludeFilterFn?: (node: Node) => boolean
}

/**
 * Subscribes to click events on the DOM and fires the provided callback
 * when the click is outside of the provided parent element.
 */
export function useClickOutside({
  parentElement,
  enabled = true,
  callback,
  excludeFilterFn,
}: UseClickOutsideOptions) {
  const memoizedCallback = useEvent(callback)
  const memoizedExcludeFilterFn = useEvent((node: Node) =>
    excludeFilterFn ? excludeFilterFn(node) : false
  )

  useEffect(() => {
    if (parentElement && enabled) {
      const handleDocumentClick = (event: MouseEvent) => {
        if (memoizedExcludeFilterFn(event.target as Node)) {
          return
        }

        if (
          parentElement !== event.target &&
          !isDomNodeParentOf(parentElement, event.target as Node)
        ) {
          memoizedCallback()
        }
      }
      document.addEventListener('click', handleDocumentClick, true)
      return () => {
        document.removeEventListener('click', handleDocumentClick, true)
      }
    }
  }, [parentElement, memoizedCallback, memoizedExcludeFilterFn, enabled])
}
