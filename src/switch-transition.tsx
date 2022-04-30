import React, { Fragment, useEffect, useState, useRef, isValidElement } from 'react'
import { Transition } from './transition'
import type { 
  TransitionProps,
  TransitionActiveListener, 
  TransitionAfterListener, 
  TransitionBeforeListener, 
  TransitionCancelledListener 
} from './transition-type'

export type SwitchTransitionMode =
  | 'all'
  | 'in-out'
  | 'out-in'

export interface SwitchTransitionProps extends Omit<
  TransitionProps,
  | 'render'
  | 'value'
  | 'endByOnAfter'
  | 'initialKeep'
  | 'leaveEndedKeep'
  | 'initial'
  | 'initialStyle'
  | 'leaveEnded'
  | 'leaveEndedStyle'
> {
  /** 过渡的模式 */
  mode?: SwitchTransitionMode
}

interface SwitchTransitionState {
  node1?: React.ReactNode
  value1?: any
  before1?: TransitionBeforeListener
  active1?: TransitionActiveListener
  after1?: TransitionAfterListener
  cancelled1?: TransitionCancelledListener
  endByOnAfter1?: boolean
  node2?: React.ReactNode
  value2?: any
  before2?: TransitionBeforeListener
  active2?: TransitionActiveListener
  after2?: TransitionAfterListener
  cancelled2?: TransitionCancelledListener
  endByOnAfter2?: boolean
}

export function SwitchTransition({
  children,
  mode,
  onBefore,
  onActive,
  onAfter,
  onCancelled,
  ...props
}: SwitchTransitionProps) {
  const dirRef = useRef<boolean>(true)
  const firstRef = useRef<boolean>(true)
  const prevRef = useRef<React.ReactNode>(children)
  const [state, setState] = useState<SwitchTransitionState>({
    node1: children,
    value1: Boolean(children)
  })
  
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false
      return
    }

    const dir = dirRef.current
    const prev = prevRef.current
    prevRef.current = children

    if (!isValidElement(children)) {
      return setState({
        [dir ? 'node1' : 'node2']: prev,
        [dir ? 'before1' : 'before2']: onBefore,
        [dir ? 'active1' : 'active2']: onActive,
        [dir ? 'cancelled1' : 'cancelled2']: onCancelled,
        [dir ? 'after1' : 'after2']: onAfter,
      })
    }

    if (!isValidElement(prev) || children.key === prev.key) {
      return setState({
        [dir ? 'value1' : 'value2']: true,
        [dir ? 'node1' : 'node2']: children,
        [dir ? 'before1' : 'before2']: onBefore,
        [dir ? 'active1' : 'active2']: onActive,
        [dir ? 'cancelled1' : 'cancelled2']: onCancelled,
        [dir ? 'after1' : 'after2']: onAfter,
      })
    }

    dirRef.current = !dirRef.current

    if (mode === 'in-out') {
      return setState({
        value1: true,
        value2: true,
        [dir ? 'node1' : 'node2']: prev,
        [dir ? 'node2' : 'node1']: children,
        [dir ? 'before2' : 'before1']: onBefore,
        [dir ? 'active2' : 'active1']: onActive,
        [dir ? 'cancelled2' : 'cancelled1']: onCancelled,
        [dir ? 'after2' : 'after1']: () => {
          setState({
            [dir ? 'value1' : 'value2']: false,
            [dir ? 'value2' : 'value1']: true,
            [dir ? 'node1' : 'node2']: prev,
            [dir ? 'node2' : 'node1']: children,
            [dir ? 'cancelled1' : 'cancelled2']: onCancelled,
            [dir ? 'after1' : 'after2']: onAfter
          })
        }
      })
    } else if (mode === 'out-in') {
      if (state.value1 || state.value2) {
        return setState({
          value1: false,
          value2: false,
          [dir ? 'node1' : 'node2']: prev,
          [dir ? 'node2' : 'node1']: children,
          [dir ? 'before1' : 'before2']: onBefore,
          [dir ? 'cancelled1' : 'cancelled2']: onCancelled,
          [dir ? 'endByOnAfter1': 'endByOnAfter2']: true,
          [dir ? 'after1' : 'after2']: (_a: any, _b: any, end: any) => {
            setState({
              [dir ? 'value1' : 'value2']: false,
              [dir ? 'value2' : 'value1']: true,
              [dir ? 'node1' : 'node2']: prev,
              [dir ? 'node2' : 'node1']: children,
              [dir ? 'cancelled2' : 'cancelled1']: onCancelled,
              [dir ? 'after2' : 'after1']: onAfter,
              [dir ? 'active2' : 'active1']: (_a: any, _b: any, _c: any) => {
                end()
                if (onActive) {
                  onActive(_a, _b, _c)
                }
              }
            })
          }
        })
      } else {
        setState({
          [dir ? 'value1' : 'value2']: false,
          [dir ? 'value2' : 'value1']: true,
          [dir ? 'node1' : 'node2']: prev,
          [dir ? 'node2' : 'node1']: children,
          [dir ? 'active2' : 'active1']: onActive,
          [dir ? 'cancelled2' : 'cancelled1']: onCancelled,
          [dir ? 'after2' : 'after1']: onAfter
        })
      }
    } else {
      return setState({
        [dir ? 'value1' : 'value2']: false,
        [dir ? 'value2' : 'value1']: true,
        [dir ? 'node1' : 'node2']: prev,
        [dir ? 'node2' : 'node1']: children,
        [dir ? 'before2' : 'before1']: onBefore,
        [dir ? 'active2' : 'active1']: onActive,
        [dir ? 'cancelled2' : 'cancelled1']: onCancelled,
        [dir ? 'after2' : 'after1']: onAfter,
      })
    }
  }, [children])

  return (
    <Fragment>
      <Transition 
        {...props} 
        value={state.value1} 
        onBefore={state.before1}
        onActive={state.active1}
        onCancelled={state.cancelled1}
        onAfter={state.after1}
        endByOnAfter={state.endByOnAfter1}
      >
        {state.node1}
      </Transition>
      <Transition 
        {...props} 
        value={state.value2} 
        onBefore={state.before2}
        onActive={state.active2}
        onCancelled={state.cancelled2}
        onAfter={state.after2}
        endByOnAfter={state.endByOnAfter2}
      >
        {state.node2}
      </Transition>
    </Fragment>
  )
}
