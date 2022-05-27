import React, { useState } from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import { Playground } from 'xueyan-react-playground'
import { ExpandTransition } from 'xueyan-react-transition'

const MARK1 = `
展开式过渡组件

\`\`\`typescript
type ExpandTransition = (
  props: ExpandTransitionProps
): JSX.Element
\`\`\`
`

const CODE1 = `
import React, { useState } from 'react'
import { Transition } from 'xueyan-react-transition'

export default function Slide() {
  const [value, setValue] = useState<boolean>(true)
  return (
    <div style={{ height: 112 }}>
      <div 
        style={{ margin: '0 0 12px' }} 
        onClick={() => setValue(!value)}
      >
        {value ? '点击收起' : '点击展开'}
      </div>
      <ExpandTransition value={value} height={40}>
        <div 
          style={{ 
            width: 100, 
            height: 74, 
            overflow: 'auto',
            fontSize: '14px',
            backgroundColor: 'var(--area1)', 
          }}
        >
          <div>第1行</div>
          <div>第2行</div>
          <div>第3行</div>
          <div>第4行</div>
          <div>----</div>
          <div>第5行</div>
          <div>第6行</div>
          <div>第7行</div>
          <div>第8行</div>
        </div>
      </ExpandTransition>
    </div>
  )
}
`

const MARK2 = `
## ExpandTransitionProps

继承自 \`TransitionProps\`。

继承属性：

| 属性 | 属性 | 属性 | 属性 |
| - | - | - | - |
| children | value | | |

自有属性：

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| className | 类名 | \`? string\` |  |
| style | 样式 | \`? React.CSSProperties\` |  |
| width | 初始宽度 | \`? React.CSSProperties['width']\` |  |
| height | 初始高度 | \`? React.CSSProperties['height']\` |  |
| enterDelay | 进入前的延迟时间 | \`? React.CSSProperties['transitionDelay']\` |  |
| enterDuration | 进入的过渡时间 | \`? React.CSSProperties['transitionDuration']\` |  |
| enterTimingFunction | 进入的过渡曲线 | \`? React.CSSProperties['transitionTimingFunction']\` |  |
| leaveDelay | 离开前的延迟时间 | \`? React.CSSProperties['transitionDelay']\` |  |
| leaveDuration | 离开的过渡时间 | \`? React.CSSProperties['transitionDuration']\` |  |
| leaveTimingFunction | 离开的过渡曲线 | \`? React.CSSProperties['transitionTimingFunction']\` |  |
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground 
        scope={{ React, useState, ExpandTransition }}
        showCode={false}
      >
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
