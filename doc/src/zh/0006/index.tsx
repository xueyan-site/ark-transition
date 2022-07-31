import React, { useState } from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import { Playground } from 'xueyan-react-playground'
import { SwitchTransition } from 'ark-transition'

const MARK1 = `
切换式过渡组件

\`\`\`
type SwitchTransition = (
  props: SwitchTransitionProps
): JSX.Element
\`\`\`

## 示例
`

const CODE1 = `
import React, { useState } from 'react'
import { Transition } from 'ark-transition'

export default function Slide() {
  const [mode, setMode] = useState<string>('out-in')
  const [value, setValue] = useState<boolean>(true)
  const [visible, setVisible] = useState<boolean>(true)
  return (
    <div style={{ height: 112 }}>
      <div style={{ margin: '0 0 12px' }}>
        <span 
          onClick={() => {
            setMode(
              mode === 'all'
                ? 'in-out' 
                : mode === 'in-out'
                ? 'out-in' 
                : 'all'
            )
          }
        >模式：{mode}</span>
        <span style={{ marginLeft: '20px' }}/>
        <span onClick={() => setValue(!value)}>点击切换</span>
        <span style={{ marginLeft: '20px' }}/>
        <span onClick={() => setVisible(!visible)}>点击显隐</span>
      </div>
      <SwitchTransition
        mode={mode}
        enterActiveStyle={{
          transition: 'all 0.3s ease-in'
        }}
        leaveActiveStyle={{
          transition: 'all 0.3s ease-out'
        }}
        enterFromStyle={{
          opacity: 0,
          transform: 'translateX(-100px)'
        }}
        leaveToStyle={{
          opacity: 0,
          transform: 'translateX(100px)'
        }}
      >
        {!visible ? null : value ? (
          <div key="blue" style={{ width: 100, backgroundColor: '#38f', height: 40 }}></div>
        ) : (
          <div key="yellow" style={{ width: 100, backgroundColor: '#f83', height: 40 }}></div>
        )}
      </SwitchTransition>
    </div>
  )
}
`

const MARK2 = `
## SwitchTransitionProps

继承 \`TransitionProps\` 部分属性，不包括：

\`render\`、\`value\`、\`endByOnAfter\`、\`initialKeep\`、\`leaveEndedKeep\`、
<br/>
\`initial\`、\`initialStyle\`、\`leaveEnded\`、\`leaveEndedStyle\`

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| mode | 过渡的模式 | \`? SwitchTransitionMode\` |  |

## SwitchTransitionMode

过渡的模式

\`\`\`
type SwitchTransitionMode = 
  | 'out-in'  // 先出后进（默认）
  | 'in-out'  // 先进后出
  | 'all'     // 同时进行
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground 
        scope={{ React, useState, SwitchTransition }}
        showCode={false}
      >
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
