import React, { useState } from 'react'
import { Article, Segment } from 'ark-markdown'
import { Playground } from 'ark-playground'
import { MoveTransition } from 'ark-transition'

const MARK1 = `
自动移动式过渡组件

\`\`\`
type MoveTransition = (
  props: MoveTransitionProps
): JSX.Element
\`\`\`

> 使用 FLIP 类实现

## 示例
`

const CODE1 = `
import React, { useState } from 'react'
import { Transition } from 'ark-transition'

export default function Slide() {
  const [move, setMove] = useState<boolean>(true)
  const [value, setValue] = useState<boolean>(true)
  return (
    <div style={{ height: 140 }}>
      <div style={{ margin: '0 0 12px' }}>
        <span onClick={() => setValue(!value)}>点击显隐</span>
        <span style={{ marginLeft: '20px' }}/>
        <span onClick={() => setMove(!move)}>点击自动移动</span>
      </div>
      {!move && (
        <span
          style={{
            width: '100px',
            height: '50px',
            display: 'inline-block',
            backgroundColor: 'var(--orange)',
          }}
        />
      )}
      <MoveTransition
        appear
        enterFromStyle={{
          opacity: 0,
          transform: 'translateX(-100px)'
        }}
        leaveToStyle={{
          opacity: 0,
          transform: 'translateX(100px)'
        }}
        activeStyle={{
          transition: 'all 0.3s'
        }}
        enterEndedStyle={{
          transition: 'all 1s'
        }}
      >
        {value && (
          <span
            key="4"
            style={{
              width: move ? 100 : 60,
              height: move ? 60 : 100,
              opacity: move ? 1 : 0.2,
              display: 'inline-block',
              backgroundColor: move ? 'var(--blue)' : 'var(--red)',
            }}
          />
        )}
      </MoveTransition>
    </div>
  )
}
`

const MARK2 = `
## MoveTransitionProps

继承 \`TransitionProps\` 部分属性，不包括：

\`render\`、\`value\`、\`endByOnAfter\`、\`initialKeep\`、\`leaveEndedKeep\`、
<br/>
\`initial\`、\`initialStyle\`、\`leaveEnded\`、\`leaveEndedStyle\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
      <Playground 
        scope={{ React, useState, MoveTransition }}
        showCode={false}
      >
        {CODE1}
      </Playground>
      <Segment>{MARK2}</Segment>
    </Article>
  )
}
