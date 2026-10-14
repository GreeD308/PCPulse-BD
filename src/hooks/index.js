import { useState, useEffect } from 'react'

/**
 * useLocalStorage – syncs state with localStorage.
 * @template T
 * @param {string} key
 * @param {T} defaultValue
 * @returns {[T, (value: T) => void]}
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // quota exceeded or private mode
    }
  }, [key, value])

  return [value, setValue]
}

/**
 * useDebounce – debounces a value by `delay` ms.
 * @template T
 * @param {T} value
 * @param {number} delay
 * @returns {T}
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
