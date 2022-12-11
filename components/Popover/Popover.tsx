import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'
import React, {
  FC,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { animated, useSpring } from 'react-spring'
import { useClickOutside, useCreatePortalElement } from '~/hooks'
import { isDomNodeParentOf } from '~/utils/isDomNodeParentOf'
import { popoverStyles, popoverVars } from './Popover.css'

export type PopoverProps = PropsWithChildren<{
  className?: string
  overlayClassName?: string
  visible: boolean
  /**
   * @default 20
   */
  placementOffset?: number
  overlay: ReactNode
  onVisibilityChange: (visible: boolean) => void
}>

export const Popover: FC<PopoverProps> = ({
  className,
  overlayClassName,
  visible,
  placementOffset = 20,
  overlay,
  children,
  onVisibilityChange,
}) => {
  const portalElement = useCreatePortalElement({
    hostElementId: 'popover-host',
    hostElementClassName: popoverStyles.host,
  })

  const rootElementRef = useRef<HTMLDivElement>(null)
  const overlayElementRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [overlayTop, setOverlayTop] = useState(0)
  const [overlayLeft, setOverlayLeft] = useState(0)
  const [overlayWidth, setOverlayWidth] = useState(0)

  // On the first render and when the visibility changes, we need to update the overlay position
  useEffect(() => {
    if (visible && rootElementRef.current) {
      const rootElementRect = rootElementRef.current.getBoundingClientRect()
      setOverlayTop(
        rootElementRect.top + rootElementRect.height + placementOffset
      )
      setOverlayLeft(rootElementRect.left)
      setOverlayWidth(rootElementRect.width)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [visible, placementOffset])

  // Click outside handling
  useClickOutside({
    enabled: isVisible,
    parentElement: overlayElementRef.current,
    excludeFilterFn: (node) =>
      !!rootElementRef.current &&
      (node === rootElementRef.current ||
        isDomNodeParentOf(rootElementRef.current, node)),
    callback: () => onVisibilityChange(false),
  })

  const overlayAnimation = useSpring({
    state: isVisible ? 1 : 0,
    config: {
      tension: 300,
      mass: 1.0,
      clamp: true,
    },
  })

  const renderOverlay = () => {
    if (!portalElement) {
      return null
    }

    return createPortal(
      <animated.div
        ref={overlayElementRef}
        className={clsx(popoverStyles.overlay, overlayClassName)}
        style={{
          ...assignInlineVars({
            [popoverVars.overlayTop]: `${overlayTop}px`,
            [popoverVars.overlayLeft]: `${overlayLeft}px`,
            [popoverVars.overlayWidth]: `${overlayWidth}px`,
          }),
          opacity: overlayAnimation.state,
          transform: overlayAnimation.state.to((value) => `scaleY(${value})`),
        }}
      >
        {overlay}
      </animated.div>,
      portalElement
    )
  }

  return (
    <Fragment>
      <div ref={rootElementRef} className={clsx(popoverStyles.root, className)}>
        {children}
      </div>
      {renderOverlay()}
    </Fragment>
  )
}
