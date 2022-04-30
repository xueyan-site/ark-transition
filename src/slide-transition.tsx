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
  /** 进入时移动的方向（不传则不移动） **/
  direction?: SlideTransitionDiraction
  /** 进入前或退出后的转换位置（优先级高于direction） */
  transform?: React.CSSProperties['transform']
}

const DIR_STYLES: Record<string, string> = {
  top: styles.xrslidetop,
  right: styles.xrslideright,
  bottom: styles.xrslidebottom,
  left: styles.xrslideleft
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
  return (
    <FadeTransition
      {...others}
      side={cn(
        side,
        transform
          ? undefined
          : direction 
          ? DIR_STYLES[direction]
          : undefined
      )}
      sideStyle={{ transform, ...sideStyle }}
      active={cn(styles.xrslideactive, active)}
    >
      {children}
    </FadeTransition>
  )
}
