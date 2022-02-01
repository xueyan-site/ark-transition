import React from 'react'
import { Transition } from './transition'
import type { TransitionProps } from './transition-type'
import styles from './fade-transition.scss'

interface PartTransitionProps extends Pick<
  TransitionProps,
  | 'children'
  | 'value'
  | 'onBefore'
  | 'onActive'
  | 'onAfter'
  | 'onCancelled'
> {}

export interface FadeTransitionProps extends PartTransitionProps {
  /** 进入后的透明度 */
  opacity?: React.CSSProperties['opacity']
  /** 进入前的延迟时间 */
  enterDelay?: React.CSSProperties['transitionDelay']
  /** 进入的过渡时间 */
  enterDuration?: React.CSSProperties['transitionDuration']
  /** 进入的过渡曲线 */
  enterTimingFunction?: React.CSSProperties['transitionTimingFunction']
  /** 离开前的延迟时间 */
  leaveDelay?: React.CSSProperties['transitionDelay']
  /** 离开的过渡时间 */
  leaveDuration?: React.CSSProperties['transitionDuration']
  /** 离开的过渡曲线 */
  leaveTimingFunction?: React.CSSProperties['transitionTimingFunction']
}

export function FadeTransition({
  children,
  value,
  onBefore,
  onActive,
  onAfter,
  onCancelled,
  opacity,
  enterDelay,
  enterDuration,
  enterTimingFunction,
  leaveDelay,
  leaveDuration,
  leaveTimingFunction
}: FadeTransitionProps) {
  return (
    <Transition
      type="transition"
      appear={true}
      value={value}
      onBefore={onBefore}
      onActive={onActive}
      onAfter={onAfter}
      onCancelled={onCancelled}
      enterActive={styles.fadeActive}
      enterActiveStyle={{
        transitionDelay: enterDelay,
        transitionDuration: enterDuration,
        transitionTimingFunction: enterTimingFunction,
      }}
      enterFrom={styles.fadeOff}
      middleStyle={{
        opacity
      }}
      leaveActive={styles.fadeActive}
      leaveActiveStyle={{
        transitionDelay: leaveDelay,
        transitionDuration: leaveDuration,
        transitionTimingFunction: leaveTimingFunction,
      }}
      leaveTo={styles.fadeOff}
    >
      {children}
    </Transition>
  )
}
