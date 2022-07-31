import React, { isValidElement } from 'react'
import cn from 'classnames'
import { clone } from 'ark-clone'
import type { 
  TransitionRendererProps, 
  TransitionClassesAndStyles, 
  TransitionType,
  TransitionKeep
} from './transition-type'

interface TransitionDefaultRendererProps extends TransitionRendererProps, TransitionClassesAndStyles {
  children?: React.ReactNode
  type: TransitionType
  initialKeep: TransitionKeep
  leaveEndedKeep: TransitionKeep
}

/**
 * 默认渲染器
 */
export function TransitionDefaultRenderer(props: TransitionDefaultRendererProps) {
  const {
    children,
    stage,
    end,
    appear,
    initialKeep,
    leaveEndedKeep
  } = props

  /**
   * 如果children不是元素，则不显示
   */
  if (!isValidElement(children)) {
    return null
  }

  /**
   * 如果处于初始态，不保持状态，或正在初始过渡，则不显示
   */
  if (stage === 'initial' && (initialKeep === 'none' || appear)) {
    return null
  }

  /**
   * 如果处于离开结束态，不保持状态，则不显示
   */
  
  if (stage === 'leaveEnded' && leaveEndedKeep === 'none') {
    return null
  }

  const newProps: Partial<any> = {}
  if (stage === 'enterStart') {
    newProps.className = cn(
      props.side,
      props.active,
      props.enterActive,
      (appear && 'appearFrom' in props)
        ? props.appearFrom 
        : props.enterFrom
    )
    newProps.style = Object.assign(
      {},
      props.sideStyle,
      props.activeStyle,
      (appear && 'appearActiveStyle' in props)
        ? props.appearActiveStyle
        : props.enterActiveStyle,
      (appear && 'appearFromStyle' in props)
        ? props.appearFromStyle 
        : props.enterFromStyle
    )
  } else if (stage === 'entering') {
    newProps.className = cn(
      props.middle,
      props.active,
      props.enterActive,
      (appear && 'appearTo' in props)
        ? props.appearTo 
        : props.enterTo
    )
    newProps.style = Object.assign(
      {},
      props.middleStyle,
      props.activeStyle,
      (appear && 'appearActiveStyle' in props)
        ? props.appearActiveStyle
        : props.enterActiveStyle,
      (appear && 'appearToStyle' in props)
        ? props.appearToStyle
        : props.enterToStyle
    )
  } else if (stage === 'enterEnded') {
    newProps.className = cn(
      props.middle, 
      props.enterEnded
    )
    newProps.style = Object.assign(
      {},
      props.middleStyle,
      props.enterEndedStyle
    )
  } else if (stage === 'leaveStart') {
    newProps.className = cn(
      props.middle,
      props.active,
      props.leaveActive,
      props.leaveFrom
    )
    newProps.style = Object.assign(
      {},
      props.middleStyle,
      props.activeStyle,
      props.leaveActiveStyle,
      props.leaveFromStyle
    )
  } else if (stage === 'leaving') {
    newProps.className = cn(
      props.side,
      props.active,
      props.leaveActive,
      props.leaveTo
    )
    newProps.style = Object.assign(
      {},
      props.sideStyle,
      props.activeStyle,
      props.leaveActiveStyle,
      props.leaveToStyle
    )
  } else {
    const keep = 
      stage === 'initial' 
        ? initialKeep 
        : leaveEndedKeep
    newProps.className = keep === 'initial' 
      ? props.initial
      : keep === 'enterFrom'
      ? props.enterFrom
      : keep === 'leaveTo'
      ? props.leaveTo
      : keep === 'leaveEnded'
      ? props.leaveEnded
      : keep === 'side'
      ? props.side
      : keep === 'middle'
      ? props.middle
      : undefined
    newProps.style = keep === 'initial' 
      ? props.initialStyle
      : keep === 'enterFrom'
      ? props.enterFromStyle
      : keep === 'leaveTo'
      ? props.leaveToStyle
      : keep === 'leaveEnded'
      ? props.leaveEndedStyle
      : keep === 'side'
      ? props.sideStyle
      : keep === 'middle'
      ? props.middleStyle
      : undefined
  }

  return clone(children, newProps, (prev, curr) => {
    const type = props.type || 'auto'
    if (type === 'auto' || type === 'animation') {
      const oldOnAE = prev.onAnimationEnd
      curr.onAnimationEnd = oldOnAE ? ((e: any) => {
        end()
        oldOnAE(e)
      }) : end
    }
    if (type === 'auto' || type === 'transition') {
      const oldOnTE = prev.onTransitionEnd
      curr.onTransitionEnd = oldOnTE ? ((e: any) => {
        end()
        oldOnTE(e)
      }) : end
    }
  })
}
