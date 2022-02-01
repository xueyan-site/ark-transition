import React, { isValidElement, cloneElement } from 'react'
import cn from 'classnames'
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

  const oldProps = children.props
  const newProps: Partial<any> = {}

  /** 在原children上添加样式和类名 */
  if (stage === 'enterStart') {
    newProps.className = cn(
      oldProps.className,
      props.enterActive,
      (appear && 'appearFrom' in props)
        ? props.appearFrom 
        : props.enterFrom
    )
    newProps.style = Object.assign(
      {},
      oldProps.style,
      (appear && 'appearActiveStyle' in props)
        ? props.appearActiveStyle
        : props.enterActiveStyle,
      (appear && 'appearFromStyle' in props)
        ? props.appearFromStyle 
        : props.enterFromStyle
    )
  } else if (stage === 'entering') {
    newProps.className = cn(
      oldProps.className,
      props.middle,
      props.enterActive,
      (appear && 'appearTo' in props)
        ? props.appearTo 
        : props.enterTo
    )
    newProps.style = Object.assign(
      {},
      oldProps.style,
      props.middleStyle,
      (appear && 'appearActiveStyle' in props)
        ? props.appearActiveStyle
        : props.enterActiveStyle,
      (appear && 'appearToStyle' in props)
        ? props.appearToStyle
        : props.enterToStyle
    )
  } else if (stage === 'enterEnded') {
    newProps.className = cn(
      oldProps.className, 
      props.middle, 
      props.enterEnded
    )
    newProps.style = Object.assign(
      {},
      oldProps.style,
      props.middleStyle,
      props.enterEndedStyle
    )
  } else if (stage === 'leaveStart') {
    newProps.className = cn(
      oldProps.className,
      props.middle,
      props.leaveActive,
      props.leaveFrom
    )
    newProps.style = Object.assign(
      {},
      oldProps.style,
      props.middleStyle,
      props.leaveActiveStyle,
      props.leaveFromStyle
    )
  } else if (stage === 'leaving') {
    newProps.className = cn(
      oldProps.className,
      props.leaveActive,
      props.leaveTo
    )
    newProps.style = Object.assign(
      {},
      oldProps.style,
      props.leaveActiveStyle,
      props.leaveToStyle
    )
  } else {
    const keep = 
      stage === 'initial' 
        ? initialKeep 
        : leaveEndedKeep
    newProps.className = cn(
      oldProps.className, 
      keep === 'initial' 
        ? props.initial
        : keep === 'enterFrom'
        ? props.enterFrom
        : keep === 'leaveTo'
        ? props.leaveTo
        : keep === 'leaveEnded'
        ? props.leaveEnded
        : undefined
    )
    newProps.style = Object.assign(
      {},
      oldProps.style,
      keep === 'initial' 
        ? props.initialStyle
        : keep === 'enterFrom'
        ? props.enterFromStyle
        : keep === 'leaveTo'
        ? props.leaveToStyle
        : keep === 'leaveEnded'
        ? props.leaveEndedStyle
        : undefined
    )
  }

  /** 在原children上添加监听器 */
  const type = props.type || 'auto'
  if (type === 'auto' || type === 'animation') {
    const oldOnAE = oldProps.onAnimationEnd
    newProps.onAnimationEnd = oldOnAE ? ((e: any) => {
      end()
      oldOnAE(e)
    }) : end
  }
  if (type === 'auto' || type === 'transition') {
    const oldOnTE = oldProps.onTransitionEnd
    newProps.onTransitionEnd = oldOnTE ? ((e: any) => {
      end()
      oldOnTE(e)
    }) : end
  }

  newProps.className = newProps.className || undefined
  return cloneElement(children, newProps)
}
