import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
过渡库基础组件

\`\`\`typescript
type Transition = (
  props: TransitionProps
) => React.ReactElement
\`\`\`

## TransitionProps

继承自 \`TransitionClassesAndStyles\`

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| children | 待渲染的元素 | \`? React.ReactNode\` | 若有自定义元素渲染器，则 children 无用 |
| render | 自定义元素渲染器 | \`? TransitionRenderer\` |  |
| type | 过渡所使用的方案类别 | \`? TransitionType\` |  |
| value | 状态 | \`? any\` | 若为true，则是呈现态，否则是隐藏态 |
| appear | 初始渲染时，若要呈现元素，是否进行过渡 | \`? boolean\` |  |
| initialKeep | 初始渲染时，指定元素保持的类名和样式 | \`? TransitionKeep\` | 默认不保留，不渲染元素 |
| leaveEndedKeep | 离开结束后，指定元素保持的类名和样式 | \`? TransitionKeep\` | 默认不保留，不渲染元素 |
| appearTimeout | 初始过渡的超时时间 | \`? number\` | 时间一到，立即结束过渡 |
| enterTimeout | 进入的超时时间 | \`? number\` | 时间一到，立即结束过渡 |
| leaveTimeout | 离开的超时时间 | \`? number\` | 时间一到，立即结束过渡 |
| onBefore | 过渡开始之前 | \`? TransitionBeforeListener\` |  |
| onActive | 过渡过程起始时 | \`? TransitionActiveListener\` |  |
| onAfter | 过渡结束后 | \`? TransitionAfterListener\` |  |
| onCancelled | 过渡被取消 | \`? TransitionCancelledListener\` | 只针对 value 发生变化的情况 |
| endByOnAfter | 交由onAfter处理结束 | \`? boolean\` |  |

## TransitionClassesAndStyles

继承自 \`TransitionBaseClassesAndStyles\`

各个阶段与类名、样式的关系，请见 “[介绍](${XT_PATH}?doc=0001)” 中的图示。

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| appearActive | 首次渲染时进入过程中类名 | \`? string\` |  |
| appearActiveStyle | 首次渲染时进入过程中样式 | \`? React.CSSProperties\` |  |
| enterActive | 进入过程中类名 | \`? string\` |  |
| enterActiveStyle | 进入过程中样式 | \`? React.CSSProperties\` |  |
| leaveActive | 离开过程中类名 | \`? string\` |  |
| leaveActiveStyle | 离开过程中样式 | \`? React.CSSProperties\` |  |
| side | 准备进入或离开过程中类名 | \`? string\` |  |
| sideStyle | 准备进入或离开过程中样式 | \`? React.CSSProperties\` |  |
| middle | 进入开始后离开结束前类名 | \`? string\` |  |
| middleStyle | 进入开始后离开结束前样式 | \`? React.CSSProperties\` |  |
| active | 进入或离开过程中类名 | \`? string\` |  |
| activeStyle | 进入或离开过程中样式 | \`? React.CSSProperties\` |  |

## TransitionBaseClassesAndStyles

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| initial | 初始类名 | \`? string\` |  |
| initialStyle | 初始样式 | \`? React.CSSProperties\` |  |
| appearFrom | 首次渲染时进入开始类名 | \`? string\` |  |
| appearFromStyle | 首次渲染时进入开始样式 | \`? React.CSSProperties\` |  |
| appearTo | 首次渲染时进入结束类名 | \`? string\` |  |
| appearToStyle | 首次渲染时进入结束样式 | \`? React.CSSProperties\` |  |
| enterFrom | 进入开始类名 | \`? string\` |  |
| enterFromStyle | 进入开始样式 | \`? React.CSSProperties\` |  |
| enterTo | 进入结束类名 | \`? string\` |  |
| enterToStyle | 进入结束样式 | \`? React.CSSProperties\` |  |
| enterEnded | 进入结束后类名 | \`? string\` |  |
| enterEndedStyle | 进入结束后样式 | \`? React.CSSProperties\` |  |
| leaveFrom | 离开开始类名 | \`? string\` |  |
| leaveFromStyle | 离开开始样式 | \`? React.CSSProperties\` |  |
| leaveTo | 离开结束类名 | \`? string\` |  |
| leaveToStyle | 离开结束样式 | \`? React.CSSProperties\` |  |
| leaveEnded | 离开后类名 | \`? string\` |  |
| leaveEndedStyle | 离开后样式 | \`? React.CSSProperties\` |  |

## TransitionRenderer

过渡元素渲染器

\`\`\`typescript
type TransitionRenderer = (
  props: TransitionRendererProps
) => React.ReactElement | null
\`\`\`

### TransitionRendererProps

提供给渲染器渲染的状态参数

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| appear | 是否处于首次呈现过渡中 | \`boolean\` |  |
| stage | 当前过渡阶段 | \`TransitionStage\` |  |
| end | 用于结束过渡 | \`TransitionEndHandler\` |  |

## TransitionStage

过渡阶段状态类型

\`\`\`typescript
type TransitionStage =
 | 'initial'      // 初始态
 | 'enterStart'   // 进入阶段开始态  
 | 'entering'     // 进入阶段过渡态 
 | 'enterEnded'   // 进入终止后
 | 'leaveStart'   // 离开阶段开始态 
 | 'leaving'      // 离开阶段过渡态 
 | 'leaveEnded'   // 离开终止后  
\`\`\`

## TransitionType

过渡的方式  

\`\`\`typescript
type TransitionType =
 | 'auto'        // 在 animation 和 transition 间自动选择（默认）
 | 'animation'   // 使用 animation 过渡  
 | 'transition'  // 使用 transition 过渡  
 | 'script'      // 使用脚本过渡（即关闭对animation和transition的监听）
\`\`\`

## TransitionKeep

未过渡时保持的类名（若它值不为空，则代表元素需要渲染）

\`\`\`typescript
type TransitionKeep =
  | 'none'
  | 'initial'
  | 'enterFrom'
  | 'leaveTo'
  | 'leaveEnded'
  | 'side'
  | 'middle'
\`\`\`

## TransitionBeforeListener

过渡之前执行的方法

> 可用于检测是否满足过渡的条件

\`\`\`typescript
type TransitionBeforeListener = (
  enter: boolean,      // 是否处于进入态，false代表处于离开态
  appear: boolean      // 是否处于首次呈现过渡中
) => (boolean | void)  // 若返回false，则放弃过渡
\`\`\`

## TransitionActiveListener

开始过渡时执行的方法

\`\`\`typescript
type TransitionActiveListener = (
  enter: boolean,            // 是否处于进入态，false代表处于离开态
  appear: boolean,           // 是否处于首次呈现过渡中
  end: TransitionEndHandler  // 结束过渡
) => void
\`\`\`

## TransitionAfterListener

过渡结束后执行的方法

\`\`\`typescript
type TransitionAfterListener = (
  enter: boolean,             // 是否处于进入态，false代表处于离开态
  appear: boolean,            // 是否处于首次呈现过渡中
  end: TransitionEndHandler   // 结束过渡，仅当 endByOnAfter 为true时有效
) => void
\`\`\`

## TransitionCancelledListener

过渡被中途取消时执行的方法（若过渡之前放弃，则不会执行此方法）

> 有时会出现过渡被取消的情况，比如，进入过程尚未完成时，状态被改为离开。

\`\`\`typescript
type TransitionCancelledListener = (
  enter: boolean,  // 是否处于进入态，false代表处于离开态
  appear: boolean  // 是否处于首次呈现过渡中
) => void
\`\`\`

## TransitionEndHandler

停止过渡

\`\`\`typescript
type TransitionEndHandler = () => void
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
