import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { collapsibleStyles } from './Collapsible.css'
import { animated, useSpring } from 'react-spring'

export type CollapsibleProps = PropsWithChildren<{
  className?: string
  contentContainerClassName?: string
  expanded: boolean
}>

export const Collapsible: FC<CollapsibleProps> = ({
  className,
  contentContainerClassName,
  expanded,
  children,
}) => {
  const contentElementRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(999999)

  // Observe content height changes and update state
  useEffect(() => {
    if (contentElementRef.current) {
      const observer = new ResizeObserver(([{ target }]) => {
        setContentHeight(parseFloat(getComputedStyle(target).height))
      })
      observer.observe(contentElementRef.current)
      return () => {
        observer.disconnect()
      }
    }
  }, [])

  const animatedRootStyles = useSpring({
    maxHeight: expanded ? contentHeight : 0,
    config: {
      mass: 1,
      tension: 300,
      clamp: true,
    },
  })

  return (
    <animated.div
      className={clsx(collapsibleStyles.root, className)}
      style={animatedRootStyles}
    >
      <div ref={contentElementRef} className={contentContainerClassName}>
        {children}
      </div>
    </animated.div>
  )
}
