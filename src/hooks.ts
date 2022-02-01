import React, { useState, useRef } from 'react'

export function useStateRef<T>(value: T): [
  T,
  React.MutableRefObject<T>,
  React.Dispatch<React.SetStateAction<T>>,
] {
  const [state, setState] = useState<T>(value)
  const stateRef = useRef<T>(state)
  stateRef.current = state
  return [state, stateRef, setState]
}

export function useDelayTime(): [
  setter: (fn: () => void, timeout?: number) => void,
  cancel: () => void
] {
  const timeRef = useRef<number>()
  const cancel = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }
  }
  const setter = (fn: () => void, timeout?: number) => {
    cancel()
    if (timeout && timeout > 0) {
      timeRef.current = setTimeout(() => {
        timeRef.current = undefined
        fn()
      }, timeout)
    } else {
      fn()
    }
  }
  return [setter, cancel]
}

export function useNextFrame(): [
  setter: (fn: FrameRequestCallback) => void,
  cancel: () => void
] {
  const timeRef = useRef<number>()
  const cancel = () => {
    if (timeRef.current) {
      cancelAnimationFrame(timeRef.current)
    }
  }
  const setter = (fn: FrameRequestCallback) => {
    cancel()
    timeRef.current = requestAnimationFrame(time => {
      timeRef.current = undefined
      fn(time)
    })
  }
  return [setter, cancel]
}
