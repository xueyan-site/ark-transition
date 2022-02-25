import React from 'react'
import cn from 'classnames'
import { FadeTransition } from './fade-transition'
import type { FadeTransitionProps } from './fade-transition'
import styles from './slide-transition.scss'

export type SlideTransitionDiraction = 
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'

export interface SlideTransitionProps extends FadeTransitionProps {
  /** 相对进入后而言，进入前在哪个方向（默认为上） **/
  direction?: SlideTransitionDiraction
  /** 进入前或退出后的转换（默认以direction为准） */
  transform?: React.CSSProperties['transform']
}

export function SlideTransition({
  children,
  direction,
  transform,
  side,
  sideStyle,
  active,
  ...others
}: SlideTransitionProps) {
  const slideSide = transform 
    ? undefined
    : direction === 'bottom'
    ? styles.slideBottom
    : direction === 'right' 
    ? styles.slideRight
    : direction === 'left' 
    ? styles.slideLeft
    : styles.slideTop
  return (
    <FadeTransition
      {...others}
      side={cn(slideSide, side)}
      sideStyle={{ transform, ...sideStyle }}
      active={cn(styles.slideActive, active)}
    >
      {children}
    </FadeTransition>
  )
}
