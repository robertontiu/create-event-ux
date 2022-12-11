import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'
import React, { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { useCreatePortalElement } from '~/hooks'
import { drawerStyles, drawerVars } from './Drawer.css'

export type DrawerProps = PropsWithChildren<{
  open: boolean
  width: string | number
  /**
   * @default 0
   */
  layerIndex?: number
  /**
   * Root element class name
   */
  className?: string
  /**
   * Content container class name (scrollable element)
   */
  contentContainerClassName?: string
  onTransitionEnd?: () => void
}>

export const Drawer: FC<DrawerProps> = ({
  open,
  width,
  layerIndex = 0,
  className,
  contentContainerClassName,
  children,
  onTransitionEnd,
}) => {
  const portalElement = useCreatePortalElement({
    hostElementId: 'drawer-host',
    hostElementClassName: drawerStyles.host,
    layerIndex,
  })

  if (!portalElement) {
    return null
  }

  return createPortal(
    <div
      className={clsx(
        drawerStyles.root,
        open && drawerStyles.rootOpen,
        className
      )}
      style={assignInlineVars({
        [drawerVars.width]: typeof width === 'number' ? `${width}px` : width,
      })}
      onTransitionEnd={onTransitionEnd}
    >
      <div
        className={clsx(
          drawerStyles.contentContainer,
          contentContainerClassName
        )}
      >
        {children}
      </div>
    </div>,
    portalElement
  )
}
