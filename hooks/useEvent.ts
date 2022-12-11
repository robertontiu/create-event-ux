import { useCallback, useRef } from 'react'

// Poor man's useEvent
// Remove this when the function is added to React
export function useEvent<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    ((...args: any[]) => callbackRef.current(...args)) as T,
    []
  )
}
