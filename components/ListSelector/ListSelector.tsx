import clsx from 'clsx'
import React, { Fragment, useRef, useState } from 'react'
import { useChangeEffect, useKeyPressEffect } from '~/hooks'
import { listSelectorStyles } from './ListSelector.css'

export type ListSelectorRenderItemProps<TItem = unknown> = {
  item: TItem
  index: number
  selected: boolean
  highlighted: boolean
  onMouseOver: () => void
  onClick: () => void
}

export type ListSelectorProps<TItem = unknown> = {
  items: TItem[]
  selectedIndex?: number

  /**
   * @default false
   */
  keyboardNavigationEnabled?: boolean

  /**
   * @default (item, index) => index
   */
  keyExtractor?: (item: TItem, index: number) => string | number

  /**
   * Content to render when there are no items in the list
   */
  renderEmptyContent?: () => React.ReactNode

  /**
   * Single item render
   */
  renderItem: (props: ListSelectorRenderItemProps<TItem>) => React.ReactNode

  /**
   * Root class name
   */
  className?: string

  onSelect: (item: TItem, index: number) => void
}

export function ListSelector<TItem = unknown>({
  items,
  selectedIndex,
  keyboardNavigationEnabled = false,
  keyExtractor = defaultKeyExtractor,
  renderEmptyContent,
  renderItem,
  className,
  onSelect,
}: ListSelectorProps<TItem>) {
  const rootElementRef = useRef<HTMLDivElement>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex ?? 0)

  // Whenever a new selected index is provided from outside, update
  // the highlighted index to match
  useChangeEffect(selectedIndex, () => {
    if (typeof selectedIndex === 'number') {
      setHighlightedIndex(selectedIndex)
    }
  })

  const scrollToIndex = (index: number) => {
    const element = rootElementRef.current?.querySelector(
      `:scope > *:nth-child(${index + 1})`
    )
    element?.scrollIntoView(false)
  }

  useKeyPressEffect({
    key: 'ArrowUp',
    onPress: (e) => {
      if (keyboardNavigationEnabled) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        const newHighlightedIndex =
          highlightedIndex > 0 ? highlightedIndex - 1 : 0
        setHighlightedIndex(newHighlightedIndex)
        scrollToIndex(newHighlightedIndex)
      }
    },
  })

  useKeyPressEffect({
    key: 'ArrowDown',
    onPress: (e) => {
      if (keyboardNavigationEnabled) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        const newHighlightedIndex =
          highlightedIndex < items.length - 1
            ? highlightedIndex + 1
            : items.length - 1

        setHighlightedIndex(newHighlightedIndex)
        scrollToIndex(newHighlightedIndex)
      }
    },
  })

  // Handle enter press
  useKeyPressEffect({
    key: 'Enter',
    onPress: (e) => {
      if (keyboardNavigationEnabled) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        onSelect(items[highlightedIndex], highlightedIndex)
      }
    },
  })

  const renderContent = () => {
    if (items.length === 0) {
      return renderEmptyContent?.()
    }

    return items.map((item, index) => {
      const key = keyExtractor(item, index)
      return (
        <Fragment key={key}>
          {renderItem({
            item,
            index,
            selected: index === selectedIndex,
            highlighted: index === highlightedIndex,
            onMouseOver: () => setHighlightedIndex(index),
            onClick: () => onSelect(item, index),
          })}
        </Fragment>
      )
    })
  }

  return (
    <div
      className={clsx(listSelectorStyles.root, className)}
      ref={rootElementRef}
    >
      {renderContent()}
    </div>
  )
}

const defaultKeyExtractor = (item: unknown, index: number) => index
