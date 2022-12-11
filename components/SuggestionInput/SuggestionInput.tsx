import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useEvent } from '~/hooks'
import { ListSelector, ListSelectorProps } from '../ListSelector'
import { Popover } from '../Popover'
import { suggestionInputStyles } from './SuggestionInput.css'

export type SuggestionInputProps<TSuggestion = unknown> = {
  value: string
  /**
   * @default false
   */
  autoFocus?: boolean
  placeholder?: string
  className?: string
  inputClassName?: string
  suggestionOverlayClassName?: string
  suggestionListClassName?: string
  suggestionOverlayPlacementOffset?: number
  getSuggestions: (query: string) => TSuggestion[]
  suggestionKeyExtractor?: ListSelectorProps<TSuggestion>['keyExtractor']
  renderSuggestion: ListSelectorProps<TSuggestion>['renderItem']
  onFocus?: () => void
  onBlur?: () => void
  onChange: (value: string) => void
  onSelectSuggestion: ListSelectorProps<TSuggestion>['onSelect']
}

export function SuggestionInput<TSuggestion = unknown>({
  value,
  autoFocus = false,
  placeholder,
  className,
  inputClassName,
  suggestionOverlayClassName,
  suggestionListClassName,
  suggestionOverlayPlacementOffset,
  getSuggestions,
  suggestionKeyExtractor,
  renderSuggestion,
  onFocus,
  onBlur,
  onChange,
  onSelectSuggestion,
}: SuggestionInputProps<TSuggestion>) {
  const inputElementRef = useRef<HTMLInputElement>(null)

  const [isInputFocused, setIsInputFocused] = useState(false)

  const [suggestions, setSuggestions] = React.useState<TSuggestion[]>([])
  const [isSuggestionPopoverVisible, setIsSuggestionPopoverVisible] =
    useState(false)
  const queryStartIndeRef = useRef(-1)

  const handleUpdateSuggestions = useEvent(() => {
    const query = getQuery({
      value: inputElementRef.current?.value ?? '',
      selectionStart: inputElementRef.current?.selectionStart ?? 0,
      selectionEnd: inputElementRef.current?.selectionEnd ?? 0,
      queryStartIndex: isSuggestionPopoverVisible
        ? queryStartIndeRef.current
        : -1,
    })

    queryStartIndeRef.current = query.startIndex
    if (query.text.length > 0) {
      const newSuggestions = getSuggestions(query.text)
      setSuggestions(newSuggestions)
      setIsSuggestionPopoverVisible(newSuggestions.length > 0)
    }
  })

  // When clicking the suggestions the input fires a blur event
  // begfore the actual click can refocus
  // Because of that we will wait with hiding the popover until
  // that interaction has been handled
  const debouncedHandleHideSuggestionsOnBlur = useDebouncedCallback(() => {
    if (!isInputFocused) {
      setIsSuggestionPopoverVisible(false)
    }
  }, 250)

  // Input autofocus handler
  useEffect(() => {
    if (inputElementRef.current && autoFocus) {
      inputElementRef.current.focus()
    }
  }, [autoFocus])

  // TODO:
  // Handle selection changes and update suggestions accordingly

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
          selectedIndex={isSuggestionPopoverVisible ? 0 : undefined}
          keyboardNavigationEnabled={isSuggestionPopoverVisible}
          keyExtractor={suggestionKeyExtractor}
          renderItem={renderSuggestion}
          onSelect={(suggestion, index) => {
            onSelectSuggestion(suggestion, index)
            setIsSuggestionPopoverVisible(false)
            inputElementRef.current?.focus()
          }}
        />
      }
      onVisibilityChange={setIsSuggestionPopoverVisible}
    >
      <input
        ref={inputElementRef}
        className={clsx(suggestionInputStyles.input, inputClassName)}
        type={'text'}
        placeholder={placeholder}
        value={value}
        onBlur={() => {
          setIsInputFocused(false)
          debouncedHandleHideSuggestionsOnBlur()
          onBlur?.()
        }}
        onFocus={() => {
          setIsInputFocused(true)
          onFocus?.()
        }}
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
  console.log(value, selectionStart, selectionEnd, queryStartIndex)

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

  console.log('new start index', startIndex)

  return {
    text: value.substring(startIndex, selectionStart),
    startIndex,
  }
}
