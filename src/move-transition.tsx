import React, { useRef, isValidElement, cloneElement } from 'react'
import { Transition } from './transition'
import type { TransitionProps } from './transition-type'
import { FLIP } from './flip'

export interface MoveTransitionProps extends Omit<
  TransitionProps,
  | 'render'
  | 'value'
  | 'endOnAfter'
  | 'initialKeep'
  | 'leaveEndedKeep'
  | 'initial'
  | 'initialStyle'
  | 'leaveEnded'
  | 'leaveEndedStyle'
> {}

export function MoveTransition({
  children,
  ...props
}: MoveTransitionProps) {
  const appearRef = useRef<boolean|undefined>(props.appear)
  const nodeRef = useRef<React.ReactNode>()
  const flipRef = useRef<FLIP>()

  if (children) {
    nodeRef.current = children
  } else {
    flipRef.current = undefined
  }
  
  let node = nodeRef.current
  if (isValidElement(nodeRef.current)) {
    if (!appearRef.current && flipRef.current) {
      flipRef.current.prepare()
    }
    node = cloneElement(nodeRef.current, {
      ref: (dom?: HTMLElement) => {
        if (dom) {
          if (flipRef.current) {
            flipRef.current.play(dom)
          } else {
            flipRef.current = new FLIP(dom)
          }
        }
      }
    })
  }

  return (
    <Transition 
      {...props} 
      value={children}
      onAfter={!appearRef.current ? props.onAfter : (enter, appear, end) => {
        appearRef.current = false
        if (props.onAfter) {
          props.onAfter(enter, appear, end)
        }
      }}
    >
      {node}
    </Transition>
  )
}
