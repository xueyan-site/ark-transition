import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
FLIP 是 First、Last、Invert、Play 四个单词首字母的缩写。

\`\`\`typescript
class FLIP {
  constructor(
    element?: HTMLElement // FLIP 作用的目标对象
  ): this
}
\`\`\`

FLIP 通过以下三个步骤，实现元素自动由初始位置运动到最终位置：

1、记录下元素的初始位置

2、记录下元素的当前位置，然后对元素使用 transform 变换来反转，让元素看起来还在初始位置

3、移除元素上的 transform，使元素由初始位置运动到最终位置

> 本类使用了 requestAnimationFrame 方法，用以在下一帧画面渲染前获取最新的样式信息。

## 成员方法

### FLIP.prepare

\`\`\`typescript
type prepare = (
  element?: HTMLElement // 更换目标元素
) => boolean            // 是否完成记录
\`\`\`

记录元素的初始位置

### FLIP.play

\`\`\`typescript
type play = (
  element?: HTMLElement // 更换目标元素
) => boolean            // 是否执行了运动
\`\`\`

执行运动动画
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
