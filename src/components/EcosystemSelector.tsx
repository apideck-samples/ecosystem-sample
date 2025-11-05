'use client'

import { PREVIEW_ECOSYSTEMS } from '@/constants/preview-ecosystems'
import { useEffect, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface EcosystemSelectorProps {
  value: string
  onChange: (value: string) => void
  mode: 'id' | 'url'
}

// Simple debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function EcosystemSelector({ value, onChange, mode }: EcosystemSelectorProps) {
  const [isCustom, setIsCustom] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [customInput, setCustomInput] = useState('')
  const debouncedCustomInput = useDebounce(customInput, 500)

  // Initialize with Apideck (first in array) as default
  useEffect(() => {
    if (!value) {
      const defaultIndex = 0 // Apideck
      setCurrentIndex(defaultIndex)
      const defaultValue =
        mode === 'id'
          ? PREVIEW_ECOSYSTEMS[defaultIndex].ecosystemId
          : PREVIEW_ECOSYSTEMS[defaultIndex].url
      onChange(defaultValue)
    } else {
      // Check if current value matches a preview ecosystem
      const matchingIndex = PREVIEW_ECOSYSTEMS.findIndex((eco) =>
        mode === 'id' ? eco.ecosystemId === value : eco.url === value
      )
      if (matchingIndex !== -1) {
        setCurrentIndex(matchingIndex)
        setIsCustom(false)
      } else if (value) {
        setIsCustom(true)
        setCustomInput(value)
      }
    }
  }, [])

  // Update parent when debounced input changes
  useEffect(() => {
    if (isCustom && debouncedCustomInput) {
      onChange(debouncedCustomInput)
    }
  }, [debouncedCustomInput, isCustom])

  function handlePrevious() {
    const newIndex = currentIndex === 0 ? PREVIEW_ECOSYSTEMS.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    const newValue =
      mode === 'id' ? PREVIEW_ECOSYSTEMS[newIndex].ecosystemId : PREVIEW_ECOSYSTEMS[newIndex].url
    onChange(newValue)
    setIsCustom(false)
  }

  function handleNext() {
    const newIndex = currentIndex === PREVIEW_ECOSYSTEMS.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    const newValue =
      mode === 'id' ? PREVIEW_ECOSYSTEMS[newIndex].ecosystemId : PREVIEW_ECOSYSTEMS[newIndex].url
    onChange(newValue)
    setIsCustom(false)
  }

  function toggleCustom() {
    if (!isCustom) {
      setIsCustom(true)
      setCustomInput('')
      onChange('')
    } else {
      setIsCustom(false)
      const newValue =
        mode === 'id'
          ? PREVIEW_ECOSYSTEMS[currentIndex].ecosystemId
          : PREVIEW_ECOSYSTEMS[currentIndex].url
      onChange(newValue)
    }
  }

  const currentEcosystem = PREVIEW_ECOSYSTEMS[currentIndex]

  if (isCustom) {
    return (
      <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-lg border border-blue-200 shadow-md px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={
              mode === 'id'
                ? 'Enter ecosystem ID (UUID format)'
                : 'Enter ecosystem URL (e.g., https://your-company.apideck.io/)'
            }
            className="flex-1 rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm px-3 py-1.5"
            autoFocus
          />
          <button
            onClick={toggleCustom}
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            ← Examples
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-lg border border-blue-200 shadow-md px-4 py-3">
      <div className="flex items-center gap-4">
        {/* Left arrow */}
        <button
          onClick={handlePrevious}
          className="flex items-center gap-1.5 p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          title="Previous"
        >
          <HiChevronLeft className="w-5 h-5" />
          <span className="text-xs hidden md:inline">Previous</span>
        </button>

        {/* Center content: title + dots */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="font-semibold text-gray-900">{currentEcosystem.name}</div>

          {/* Dot indicators - centered under title */}
          <div className="flex items-center justify-center gap-1.5">
            {PREVIEW_ECOSYSTEMS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  const newValue =
                    mode === 'id'
                      ? PREVIEW_ECOSYSTEMS[index].ecosystemId
                      : PREVIEW_ECOSYSTEMS[index].url
                  onChange(newValue)
                }}
                className={`h-1 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-blue-600' : 'w-1 bg-gray-300 hover:bg-gray-400'
                }`}
                title={PREVIEW_ECOSYSTEMS[index].name}
              />
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          title="Next"
        >
          <span className="text-xs hidden md:inline">Next</span>
          <HiChevronRight className="w-5 h-5" />
        </button>

        <span className="text-gray-300 flex-shrink-0 px-2">|</span>

        {/* Custom toggle */}
        <button
          onClick={toggleCustom}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap flex-shrink-0"
        >
          Use custom {mode === 'id' ? 'ID' : 'URL'}
        </button>
      </div>
    </div>
  )
}
