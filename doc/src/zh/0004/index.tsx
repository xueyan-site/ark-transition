import React, { useState } from 'react'
import { Article, Segment } from 'xueyan-react-markdown'
import { Playground } from 'xueyan-react-playground'
import { SlideTransition } from 'xueyan-react-transition'

const MARK1 = `
滑动式过渡组件

> 默认附带 transform 过渡效果的过渡组件  
> 页面初始渲染时，若组件可见，且有移动的方位，则会执行滑动效果  
> 若要去除，设置 appear 为 false  

\`\`\`
type SlideTransition = (
  props: SlideTransitionProps
): JSX.Element
\`\`\`

## 示例
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
        {value ? '点击离开（向下）' : '点击进入（向上）'}
      </div>
      <SlideTransition value={value} direction="bottom">
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
      </SlideTransition>
    </div>
  )
}
`

const MARK2 = `
## SlideTransitionProps

继承 \`FadeTransitionProps\` 所有属性

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| direction | 离开时的移动方向（不传则不移动） | \`? SlideTransitionDiraction\` |  |
| transform | 进入前或退出后的转换样式 | \`? React.CSSProperties['transform']\` | 优先级高于direction |

## SlideTransitionDiraction

离开时的移动方向

\`\`\`
type SlideTransitionDiraction = 
  | 'top'     // 向上离开
  | 'right'   // 向右离开
  | 'bottom'  // 向下离开
  | 'left'    // 向左离开
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground 
        scope={{ React, useState, SlideTransition }}
        showCode={false}
      >
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
