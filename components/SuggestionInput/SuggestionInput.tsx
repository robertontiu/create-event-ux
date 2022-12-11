import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { useEvent } from '~/hooks'
import { ListSelector, ListSelectorProps } from '../ListSelector'
import { Popover } from '../Popover'
import { suggestionInputStyles } from './SuggestionInput.css'

export type SuggestionInputProps<TSuggestion = unknown> = {
  value: string
  className?: string
  inputClassName?: string
  suggestionOverlayClassName?: string
  suggestionListClassName?: string
  suggestionOverlayPlacementOffset?: number
  getSuggestions: (query: string) => TSuggestion[]
  suggestionKeyExtractor?: ListSelectorProps<TSuggestion>['keyExtractor']
  renderSuggestion: ListSelectorProps<TSuggestion>['renderItem']
  onChange: (value: string) => void
  onSelectSuggestion: ListSelectorProps<TSuggestion>['onSelect']
}

export function SuggestionInput<TSuggestion = unknown>({
  value,
  className,
  inputClassName,
  suggestionOverlayClassName,
  suggestionListClassName,
  suggestionOverlayPlacementOffset,
  getSuggestions,
  suggestionKeyExtractor,
  renderSuggestion,
  onChange,
  onSelectSuggestion,
}: SuggestionInputProps<TSuggestion>) {
  const inputElementRef = useRef<HTMLInputElement>(null)
  const [suggestions, setSuggestions] = React.useState<TSuggestion[]>([])
  const [isSuggestionPopoverVisible, setIsSuggestionPopoverVisible] =
    useState(false)
  const queryStartIndeRef = useRef(-1)

  const handleUpdateSuggestions = useEvent(() => {
    const query = getQuery({
      value: inputElementRef.current?.value ?? '',
      selectionStart: inputElementRef.current?.selectionStart ?? 0,
      selectionEnd: inputElementRef.current?.selectionEnd ?? 0,
      queryStartIndex: queryStartIndeRef.current,
    })

    queryStartIndeRef.current = query.startIndex
    if (query.text.length > 0) {
      const newSuggestions = getSuggestions(query.text)
      setSuggestions(newSuggestions)
      setIsSuggestionPopoverVisible(newSuggestions.length > 0)
    }
  })

  // Update suggestions when selection changes
  useEffect(() => {
    const inputElement = inputElementRef.current
    if (inputElement) {
      inputElement.addEventListener('selectionchange', handleUpdateSuggestions)
      return () => {
        inputElement.removeEventListener(
          'selectionchange',
          handleUpdateSuggestions
        )
      }
    }
  }, [handleUpdateSuggestions])

  return (
    <Popover
      className={className}
      overlayClassName={suggestionOverlayClassName}
      visible={isSuggestionPopoverVisible}
      placementOffset={suggestionOverlayPlacementOffset}
      overlay={
        <ListSelector
          className={suggestionListClassName}
          items={suggestions}
          keyboardNavigationEnabled={isSuggestionPopoverVisible}
          keyExtractor={suggestionKeyExtractor}
          renderItem={renderSuggestion}
          onSelect={(suggestion, index) => {
            onSelectSuggestion(suggestion, index)
            setIsSuggestionPopoverVisible(false)
          }}
        />
      }
      onVisibilityChange={setIsSuggestionPopoverVisible}
    >
      <input
        ref={inputElementRef}
        className={clsx(suggestionInputStyles.input, inputClassName)}
        type={'text'}
        value={value}
        onBlur={() => setIsSuggestionPopoverVisible(false)}
        onFocus={handleUpdateSuggestions}
        onChange={(e) => {
          handleUpdateSuggestions()
          onChange(e.target.value)
        }}
      />
    </Popover>
  )
}

function getQuery({
  value,
  selectionStart,
  selectionEnd,
  queryStartIndex,
}: {
  value: string
  selectionStart: number
  selectionEnd: number
  queryStartIndex: number
}) {
  // Do not suggest anything if the user selected a part of the text
  if (selectionStart !== selectionEnd) {
    return {
      text: '',
      startIndex: -1,
    }
  }

  if (queryStartIndex >= 0 && queryStartIndex < selectionStart) {
    return {
      text: value.substring(queryStartIndex, selectionStart),
      startIndex: queryStartIndex,
    }
  }

  const startIndex =
    value.indexOf(' ') === -1
      ? 0
      : value.substring(0, selectionStart).lastIndexOf(' ') + 1

  return {
    text: value.substring(startIndex, selectionStart),
    startIndex,
  }
}
