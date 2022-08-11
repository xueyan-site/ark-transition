import React, { useState } from 'react'
import { Article, Segment } from 'ark-markdown'
import { Playground } from 'ark-playground'
import { FadeTransition } from 'ark-transition'

const MARK1 = `
渐变式过渡组件

> 默认附带 opacity 过渡效果的过渡组件  
> 页面初始渲染时，若组件可见，会执行渐变效果  
> 若要去除，设置 appear 为 false  

\`\`\`
type FadeTransition = (
  props: FadeTransitionProps
) => JSX.Element
\`\`\`

## 示例
`

const CODE1 = `
import React, { useState } from 'react'
import { Transition } from 'ark-transition'

export default function Slide() {
  const [value, setValue] = useState<boolean>(true)
  return (
    <div style={{ height: 112 }}>
      <div style={{ margin: '0 0 12px' }} onClick={() => setValue(!value)}>
        {value ? '点击离开（透明度 100% -> 0）' : '点击进入（透明度 0 -> 100%）'}
      </div>
      <FadeTransition value={value}>
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
      </FadeTransition>
    </div>
  )
}
`

const MARK2 = `
## FadeTransitionProps

继承 \`TransitionProps\` 部分属性：

\`children\`、\`value\`、\`initialKeep\`、\`leaveEndedKeep\`、
<br/>
\`onBefore\`、\`onActive\`、\`onAfter\`、\`onCancelled\`、
<br/>
\`enterFrom\`、\`enterFromStyle\`、\`leaveTo\`、\`leaveToStyle\`、
<br/>
\`side\`、\`sideStyle\`、\`middle\`、\`middleStyle\`、
<br/>
\`active\`、\`activeStyle\`

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| unmount | 在退出后卸载节点 | \`? boolean\` |  |
| opacity | 进入前或退出后的透明度 | \`? React.CSSProperties['opacity']\` | 默认透明 |
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
        scope={{ React, useState, FadeTransition }}
        showCode={false}
      >
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
