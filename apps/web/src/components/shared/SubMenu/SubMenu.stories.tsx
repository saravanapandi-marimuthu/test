import type { Meta, StoryFn } from '@storybook/react'

import SubMenu from './SubMenu'

export const generated: StoryFn<typeof SubMenu> = args => {
  return <SubMenu {...args} />
}

export default {
  title: 'SubMenu',
  component: SubMenu,
} as Meta<typeof SubMenu>
