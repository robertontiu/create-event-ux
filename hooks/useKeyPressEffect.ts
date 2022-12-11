import { useEffect } from 'react'
import { useEvent } from './useEvent'

export type UseKeypressEffectCallback = (e: KeyboardEvent) => void

export type UseKeypressEffectCallbacks =
  | {
      onPress: UseKeypressEffectCallback
      onRelease: UseKeypressEffectCallback
    }
  | {
      onPress: UseKeypressEffectCallback
      onRelease?: never
    }
  | {
      onPress?: never
      onRelease: UseKeypressEffectCallback
    }

export type UseKeypressEffectOptions = {
  key: string
} & UseKeypressEffectCallbacks

/**
 * Subscribes to keydown and keyup events on the DOM and fires the provided
 * callbacks when the desired key is pressed or released.
 */
export function useKeyPressEffect({
  key: targetKey,
  onPress,
  onRelease,
}: UseKeypressEffectOptions) {
  const memoizedOnPress = useEvent((e: KeyboardEvent) => onPress?.(e))
  const memoizedOnRelease = useEvent((e: KeyboardEvent) => onRelease?.(e))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        memoizedOnPress(e)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        memoizedOnRelease(e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [targetKey, memoizedOnPress, memoizedOnRelease])
}
