import React from 'react'
import cn from 'classnames'
import { Transition } from './transition'
import type { TransitionProps } from './transition-type'
import styles from './slide-transition.scss'

interface PartTransitionProps extends Pick<
  TransitionProps,
  | 'children'
  | 'value'
  | 'initialKeep'
  | 'leaveEndedKeep'
  | 'onBefore'
  | 'onActive'
  | 'onAfter'
  | 'onCancelled'
> {}

export type SlideTransitionDiraction = 
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'

export interface SlideTransitionProps extends PartTransitionProps {
  /** 
   * 进入前或离开后，元素相对于进入后的方向  
   * 默认方向为左，距离等于元素自身的宽  
   * 若传了 transformFrom，则起始设定以 transformFrom 为准  
   * 若传了 transformTo，则终止设定以 transformFrom 为准  
   **/
  direction?: SlideTransitionDiraction
  /** 进入前的位置 */
  transformFrom?: React.CSSProperties['transform']
  /** 进入后的位置 */
  transform?: React.CSSProperties['transform']
  /** 离开后的位置 */
  transformTo?: React.CSSProperties['transform']
  /** 关闭透明度过渡 */
  disableOpacity?: boolean
  /** 透明度 */
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

export function SlideTransition({
  children,
  value,
  initialKeep,
  leaveEndedKeep,
  onBefore,
  onActive,
  onAfter,
  onCancelled,
  opacity,
  transformFrom,
  transform,
  transformTo,
  enterDelay,
  enterDuration,
  enterTimingFunction,
  leaveDelay,
  leaveDuration,
  leaveTimingFunction,
  direction,
  disableOpacity
}: SlideTransitionProps) {
  const opaCls = disableOpacity 
    ? undefined 
    : styles.slideOpacityOff
  const dirCls = direction === 'bottom'
    ? styles.slideBottom
    : direction === 'right' 
    ? styles.slideRight
    : direction === 'left' 
    ? styles.slideLeft
    : styles.slideTop
  return (
    <Transition
      type="transition"
      initialKeep={initialKeep}
      leaveEndedKeep={leaveEndedKeep}
      appear={true}
      value={value}
      onBefore={onBefore}
      onActive={onActive}
      onAfter={onAfter}
      onCancelled={onCancelled}
      enterActive={styles.slideActive}
      enterActiveStyle={{
        transitionDelay: enterDelay,
        transitionDuration: enterDuration,
        transitionTimingFunction: enterTimingFunction,
      }}
      enterFrom={cn(opaCls, transformFrom ? undefined : dirCls)}
      enterFromStyle={{
        transform: transformFrom
      }}
      middleStyle={{
        opacity,
        transform
      }}
      leaveActiveStyle={{
        transitionDelay: leaveDelay,
        transitionDuration: leaveDuration,
        transitionTimingFunction: leaveTimingFunction,
      }}
      leaveActive={styles.slideActive}
      leaveTo={cn(opaCls, transformTo ? undefined : dirCls)}
      leaveToStyle={{
        transform: transformTo
      }}
    >
      {children}
    </Transition>
  )
}
