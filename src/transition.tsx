import { useEffect, useRef, createElement } from 'react'
import { useDelayTime, useNextFrame, useStateRef } from './hooks'
import { TransitionDefaultRenderer } from './transition-renderer'
import type { TransitionProps, TransitionStage } from './transition-type'

export function Transition(props: TransitionProps) {
  const {
    render,
    value,
    appear,
    onBefore,
    onActive,
    onAfter,
    onCancelled,
    endByOnAfter,
  } = props
  const enter = Boolean(value)
  const firstRef = useRef<boolean>(true)
  const appearRef = useRef<boolean>(Boolean(enter && appear))
  const [stage, stageRef, setStage] = useStateRef<TransitionStage>('initial')
  const [_setNext, cancelNext] = useNextFrame()
  const [_setDelay, cancelDelay] = useDelayTime()
  const setNext = (fn: FrameRequestCallback) => {
    cancelDelay()
    _setNext(fn)
  }
  const setDelay = (fn: () => void, timeout?: number | undefined) => {
    cancelNext()
    _setDelay(fn, timeout)
  }

  /**
   * 设定为过渡结束状态
   */
  const handleEnd = () => {
    if (stageRef.current === 'initial' || stageRef.current === 'leaveEnded') {
      return
    }
    if (!endByOnAfter) {
      setStage(enter ? 'enterEnded' : 'leaveEnded')
    }
    if (onAfter) {
      onAfter(enter, appearRef.current, () => {
        if (endByOnAfter) {
          if (stageRef.current === 'initial' || stageRef.current === 'leaveEnded') {
            return
          }
          setStage(enter ? 'enterEnded' : 'leaveEnded')
        }
      })
    }
  }

  /**
   * 设定为过渡起始状态
   */
  const handleStart = () => {
    if (onBefore && onBefore(enter, appearRef.current) === false) {
      return
    }
    const stage = stageRef.current
    // 重设过渡结束定时器
    const resetDuration = () => {
      let duration = enter ? props.enterTimeout : props.leaveTimeout
      if (appearRef.current && 'appearDuration' in props) {
        duration = props.appearTimeout
      }
      if (duration) {
        setDelay(handleEnd, duration)
      }
    }
    // 取消之前的过渡，直接设为过渡中
    const changeActive = (stage: TransitionStage) => {
      setStage(stage)
      resetDuration()
      if (onCancelled) {
        onCancelled(enter, appearRef.current)
      }
      if (onActive) {
        onActive(enter, appearRef.current, handleEnd)
      }
    }
    if (enter) {
      // 如果状态变为进入时，但当前正在离开，直接改为进入中
      if (stage === 'leaving' || stage === 'leaveStart') {
        return changeActive('entering')
      }
      // 如果状态变为进入时，但当前正在进入中，什么也不动
      if (stage === 'entering' || stage === 'enterStart') {
        return
      }
    } else {
      // 如果状态变为离开时，但当前正在进入，直接改为进入中
      if (stage === 'entering' || stage === 'enterStart') {
        return changeActive('leaving')
      }
      // 如果状态变为离开时，但当前正在离开中，什么也不动
      if (stage === 'leaving' || stage === 'leaveStart') {
        return
      }
    }
    // 其它情况正常进行
    setNext(() => {
      setStage(enter ? 'enterStart' : 'leaveStart')
      setNext(() => {
        setStage(enter ? 'entering' : 'leaving')
        resetDuration()
      })
      if (onActive) {
        onActive(enter, appearRef.current, handleEnd)
      }
    })
  }

  /**
   * 初次渲染时，
   * - 若children有值，
   * --- 允许初始过渡，则开始过渡。
   * --- 不允许初始过渡，则直接设为过渡结束态。
   * - 若children无值，则不做任何处理。
   * 非初次渲染，按照正常过渡逻辑进行。
   */
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false
      if (enter) {
        if (appear) {
          handleStart()
        } else {
          setStage('enterEnded')
        }
      }
    } else {
      appearRef.current = false
      handleStart()
    }
  }, [enter])

  /**
   * 确保appearRef标志正确
   */
  useEffect(() => {
    if (stage === 'enterEnded') {
      appearRef.current = false
    }
  }, [stage])

  if (render) {
    return createElement(render, {
      stage,
      end: handleEnd,
      appear: appearRef.current,
    })
  } else {
    return createElement(TransitionDefaultRenderer, {
      ...props,
      stage,
      end: handleEnd,
      appear: appearRef.current,
      type: props.type || 'auto',
      initialKeep: props.initialKeep || 'none',
      leaveEndedKeep: props.leaveEndedKeep || 'none'
    })
  }
}
