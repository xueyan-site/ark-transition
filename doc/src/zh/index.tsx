import React from 'react'
import { ClassIcon, ComponentIcon } from 'sicon'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'sdin-react'
import type { Collection } from 'ark-doc'

const CLASS_ICON = <ClassIcon color="var(--red)" />
const COMPONENT_ICON = <ComponentIcon color="var(--blue)" />

const COLLECTIONS: Collection<string,string>[] = [
  {
    value: '9999',
    label: '指南',
    contents: [
      {
        value: '0001',
        label: '介绍',
        content: () => import('./0001')
      }
    ]
  },
  {
    value: '9998',
    label: '接口文档',
    contents: [
      {
        value: '0002',
        label: 'Transition',
        icon: COMPONENT_ICON,
        content: () => import('./0002')
      },
      {
        value: '0003',
        label: 'FadeTransition',
        icon: COMPONENT_ICON,
        content: () => import('./0003')
      },
      {
        value: '0004',
        label: 'SlideTransition',
        icon: COMPONENT_ICON,
        content: () => import('./0004')
      },
      {
        value: '0005',
        label: 'ExpandTransition',
        icon: COMPONENT_ICON,
        content: () => import('./0005')
      },
      {
        value: '0006',
        label: 'SwitchTransition',
        icon: COMPONENT_ICON,
        content: () => import('./0006')
      },
      {
        value: '0007',
        label: 'MoveTransition',
        icon: COMPONENT_ICON,
        content: () => import('./0007')
      },
      {
        value: '0008',
        label: 'FLIP',
        icon: CLASS_ICON,
        content: () => import('./0008')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="zh"
      version={pkg.version}
      collections={COLLECTIONS}
      name={pkg.name}
      description={pkg.description}
    />
  )
}
