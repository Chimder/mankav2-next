import { useCallback, useRef } from "react";

export const useEffectEvent = callback => {
  const ref = useRef(callback)

  // eslint-disable-next-line react-compiler/react-compiler
  ref.current = callback

  return useCallback((...args) => {
    ref.current(...args)
  }, [])
}