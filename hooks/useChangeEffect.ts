import { useEffect, useRef } from 'react'
import { useEvent } from './useEvent'

export type UseChangeEffectIsEqualComparator<T> = (
  currentValue: T,
  prevValue: T
) => boolean

/**
 * Watches a variable for changes and fires the provided callback when it does
 */
export function useChangeEffect<T>(
  value: T,
  callback: (currentValue: T, prevValue: T) => void,
  isEqualComparator: UseChangeEffectIsEqualComparator<T> = defaultIsEqualComparator
) {
  const prevValueRef = useRef(value)

  const memoizedCallback = useEvent(callback)
  const memoizedIsEqualComparator = useEvent(isEqualComparator)

  useEffect(() => {
    if (!memoizedIsEqualComparator(value, prevValueRef.current)) {
      memoizedCallback(value, prevValueRef.current)
      prevValueRef.current = value
    }
  }, [value, memoizedCallback, memoizedIsEqualComparator])
}

export function defaultIsEqualComparator<T>(currentValue: T, prevValue: T) {
  return currentValue === prevValue
}
