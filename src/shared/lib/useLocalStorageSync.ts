import { useSyncExternalStore } from "react"

type LocalStorageValue = string | null

export function useLocalStorageSync(
  key: string,
  initialValue: LocalStorageValue = null,
): [value: LocalStorageValue, setValue: (newValue: LocalStorageValue) => void] {
  const getSnapshot = () => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? storedValue : initialValue
  }
  const subscribe = (callback: () => void) => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        callback()
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }
  const value = useSyncExternalStore(subscribe, getSnapshot)
  const setValue = (newValue: LocalStorageValue) =>
    newValue === null
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, newValue)

  return [value, setValue]
}
