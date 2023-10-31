import { useEffect, DependencyList } from 'react'
import debounce from 'lodash/debounce'

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    // Wrap the provided function with lodash's debounce
    const debouncedFn = debounce(fn, waitTime)

    // Execute the debounced function
    debouncedFn.apply(undefined, (deps ? [...deps] : []) as [])

    // Cleanup function to cancel the debounced function if the component unmounts
    return () => {
      debouncedFn.cancel()
    }
  }, deps)
}
