import type { ComponentType } from 'react'

export interface AppRoute {
  path: string
  title: string
  component: ComponentType
  showInMenu?: boolean
}
