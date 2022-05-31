import React, { useState } from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import STAGES_IMG from './stages.svg'
import { Playground } from 'xueyan-react-playground'
import { Transition } from 'xueyan-react-transition'

const MARK1 = `
transition 库用于实现复杂过渡效果，

下图是过渡 \`各个阶段\` 及其 \`事件\`、\`className\`、\`style\`：

![过渡阶段图](${STAGES_IMG})

## 示例

以透明度渐变的方式。从左进入，从右离开。
`

const CODE1 = `
import React, { useState } from 'react'
import { Transition } from 'xueyan-react-transition'

export default function Example() {
  const [value, setValue] = useState<boolean>(true)
  return (
    <div style={{ height: 112 }}>
      <div 
        style={{ margin: '0 0 12px' }} 
        onClick={() => setValue(!value)}
      >
        {value ? '点击离开（透明度 100% -> 0）' : '点击进入（透明度 0 -> 100%）'}
      </div>
      <Transition
        value={value}
        enterFromStyle={{ transform: 'translateX(-100%)', opacity: 0 }}
        leaveToStyle={{ transform: 'translateX(100%)', opacity: 0 }}
        activeStyle={{ transition: 'all 0.3s' }}
      >
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
      </Transition>
    </div>
  )
}
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground 
        scope={{ React, useState, Transition }}
        showCode={false}
      >
        {CODE1}
      </Playground>
    </Article>
  )
}
