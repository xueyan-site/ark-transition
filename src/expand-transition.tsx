import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Transition } from './transition'
import styles from './expand-transition.scss'
import type { TransitionProps } from './transition-type'

export interface ExpandTransitionProps extends Pick<
  TransitionProps,
  | 'children'
  | 'value'
> {
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 初始宽度 */
  width?: React.CSSProperties['width']
  /** 初始高度 */
  height?: React.CSSProperties['height']
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

export interface ExpandTransitionRef {
  /** 根节点 */
  rootNode: HTMLDivElement | null
}

export const ExpandTransition = forwardRef<ExpandTransitionRef, ExpandTransitionProps>(({
  className,
  style,
  children,
  value,
  width,
  height,
  enterDelay,
  enterDuration,
  enterTimingFunction,
  leaveDelay,
  leaveDuration,
  leaveTimingFunction
}, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<React.CSSProperties>()

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  useEffect(() => {
    const rootNode = rootRef.current
    if (rootNode) {
      if (
        !rect 
        || rect.width !== rootNode.scrollWidth 
        || rect.height !== rootNode.scrollHeight
      ) {
        setRect({
          width: rootNode.scrollWidth,
          height: rootNode.scrollHeight
        })
      }
    }
  }, [value])

  return (
    <Transition
      value={value}
      type="transition"
      initialKeep='side'
      leaveEndedKeep="side"
      side={styles.xrexpandside}
      active={styles.xrexpandactive}
      sideStyle={{ width, height }}
      enterToStyle={rect}
      leaveFromStyle={rect}
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
      <div
        ref={rootRef}
        style={style}
        className={className}
      >
        {children}
      </div>
    </Transition>
  )
})
