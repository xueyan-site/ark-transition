import React from 'react'
import cn from 'classnames'
import { Transition } from './transition'
import type { TransitionProps } from './transition-type'
import styles from './fade-transition.scss'

export interface FadeTransitionProps extends Pick<
  TransitionProps,
  | 'children'
  | 'value'
  | 'initialKeep'
  | 'leaveEndedKeep'
  | 'onBefore'
  | 'onActive'
  | 'onAfter'
  | 'onCancelled'
  | 'enterFrom'
  | 'enterFromStyle'
  | 'leaveTo'
  | 'leaveToStyle'
  | 'side'
  | 'sideStyle'
  | 'middle'
  | 'middleStyle'
  | 'active'
  | 'activeStyle'
> {
  /** 在退出后卸载节点 */
  unmount?: boolean
  /** 进入前或退出后的透明度（默认透明） */
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
  initialKeep,
  leaveEndedKeep,
  onBefore,
  onActive,
  onAfter,
  onCancelled,
  enterFrom,
  enterFromStyle,
  leaveTo,
  leaveToStyle,
  side,
  sideStyle,
  middle,
  middleStyle,
  active,
  activeStyle,
  unmount,
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
      initialKeep={initialKeep}
      leaveEndedKeep={unmount ? undefined : (leaveEndedKeep || 'leaveEnded')}
      enterFrom={enterFrom}
      enterFromStyle={enterFromStyle}
      leaveTo={leaveTo}
      leaveToStyle={leaveToStyle}
      leaveEnded={styles.xrfadeended}
      side={cn(opacity ? undefined : styles.xrfadeside, side)}
      sideStyle={{ opacity, ...sideStyle }}
      middle={middle}
      middleStyle={middleStyle}
      active={cn(styles.xrfadeactive, active)}
      activeStyle={activeStyle}
      enterActiveStyle={{
        transitionDelay: enterDelay,
        transitionDuration: enterDuration,
        transitionTimingFunction: enterTimingFunction,
      }}
      leaveActiveStyle={{
        transitionDelay: leaveDelay,
        transitionDuration: leaveDuration,
        transitionTimingFunction: leaveTimingFunction,
      }}
    >
      {children}
    </Transition>
  )
}
