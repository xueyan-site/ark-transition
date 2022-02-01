import React from "react"

/**
 * 过渡阶段  
 * initial：初始态  
 * enterStart：进入阶段起始态  
 * entering：进入阶段过渡态  
 * enterEnded：进入终止后  
 * leaveStart：离开阶段起始态  
 * leaving：离开阶段过渡态  
 * leaveEnded：离开终止后  
 */
export type TransitionStage =
  | 'initial'
  | 'enterStart'
  | 'entering'
  | 'enterEnded'
  | 'leaveStart'
  | 'leaving'
  | 'leaveEnded'

/**
 * 过渡的方式  
 * auto：在animation和transition间自动选择  
 * animation：使用animation过渡  
 * transition：使用transition过渡  
 * script：使用脚本过渡（即关闭对animation和transition的监听）  
 */
export type TransitionType =
  | 'auto'
  | 'animation'
  | 'transition'
  | 'script'

/**
 * 过渡终止后保持的类名
 */
export type TransitionKeep =
  | 'none'
  | 'initial'
  | 'enterFrom'
  | 'leaveTo'
  | 'leaveEnded'

/**
 * 停止过渡
 */
export type TransitionEndHandler = () => void

/**
 * 过渡之前执行的方法
 * @param enter 是否处于进入态，false代表处于离开态
 * @param appear 是否处于首次呈现过渡中
 * @result 若为false，则放弃过渡
 */
export type TransitionBeforeListener = (
  enter: boolean,
  appear: boolean
) => (boolean | void)

/**
 * 开始过渡时执行的方法
 * @param enter 是否处于进入态，false代表处于离开态
 * @param appear 是否处于首次呈现过渡中
 * @param end 结束过渡
 */
export type TransitionActiveListener = (
  enter: boolean,
  appear: boolean,
  end: TransitionEndHandler
) => void

/**
 * 过渡结束后执行的方法
 * @param enter 是否处于进入态，false代表处于离开态
 * @param appear 是否处于首次呈现过渡中
 * @param end 结束过渡，仅当endByOnAfter为true时有效
 */
export type TransitionAfterListener = (
  enter: boolean,
  appear: boolean,
  end: () => void
) => void

/**
 * 过渡被中途取消时执行的方法（过渡之前放弃不会执行此方法）
 * @param enter 是否处于进入态，false代表处于离开态
 * @param appear 是否处于首次呈现过渡中
 */
export type TransitionCancelledListener = (
  enter: boolean,
  appear: boolean
) => void

/**
 * 过渡各阶段可设置的样式和类名
 */
interface TransitionClassesAndStyles {
  initial?: string
  initialStyle?: React.CSSProperties

  appearFrom?: string
  appearFromStyle?: React.CSSProperties

  appearActive?: string
  appearActiveStyle?: React.CSSProperties

  appearTo?: string
  appearToStyle?: React.CSSProperties

  enterFrom?: string
  enterFromStyle?: React.CSSProperties

  enterActive?: string
  enterActiveStyle?: React.CSSProperties

  enterTo?: string
  enterToStyle?: React.CSSProperties

  enterEnded?: string
  enterEndedStyle?: React.CSSProperties

  middle?: string
  middleStyle?: React.CSSProperties

  leaveFrom?: string
  leaveFromStyle?: React.CSSProperties

  leaveActive?: string
  leaveActiveStyle?: React.CSSProperties

  leaveTo?: string
  leaveToStyle?: React.CSSProperties

  leaveEnded?: string
  leaveEndedStyle?: React.CSSProperties
}

export interface TransitionRendererProps {
  /** 是否处于首次呈现过渡中 */
  appear: boolean
  /** 当前过渡阶段 */
  stage: TransitionStage
  /** 用于结束过渡 */
  end: TransitionEndHandler
}

/**
 * 过渡元素渲染器
 * @param props 提供给渲染器渲染的状态参数
 */
export type TransitionRenderer = (
  props: TransitionRendererProps
) => React.ReactElement | null

export interface TransitionProps extends TransitionClassesAndStyles {
  /** 待渲染的元素（若有自定义元素渲染器，则 children 无用） */
  children?: React.ReactNode
  /** 自定义元素渲染器 */
  render?: TransitionRenderer
  /** 过渡所使用的方案类别 */
  type?: TransitionType
  /** 状态（若为true，则是呈现态，否则是隐藏态） */
  value?: any
  /** 初始渲染时，若要呈现元素，是否进行过渡 */
  appear?: boolean
  /** 初始渲染时，指定元素保持的类名和样式（默认不保留，不渲染元素） */
  initialKeep?: TransitionKeep
  /** 离开结束后，指定元素保持的类名和样式（默认不保留，不渲染元素） */
  leaveEndedKeep?: TransitionKeep
  /** 初始过渡的超时时间（时间一到，立即结束过渡） */
  appearTimeout?: number
  /** 进入的超时时间（时间一到，立即结束过渡） */
  enterTimeout?: number
  /** 离开的超时时间（时间一到，立即结束过渡） */
  leaveTimeout?: number
  /** 过渡开始之前 */
  onBefore?: TransitionBeforeListener
  /** 过渡过程起始时 */
  onActive?: TransitionActiveListener
  /** 过渡结束后 */
  onAfter?: TransitionAfterListener
  /** 过渡被取消（只针对 value 发生变化的情况） */
  onCancelled?: TransitionCancelledListener
  /** 交由onAfter处理结束 */
  endByOnAfter?: boolean
}
