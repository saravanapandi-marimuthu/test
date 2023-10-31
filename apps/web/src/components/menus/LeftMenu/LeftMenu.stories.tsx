import type { Meta, StoryFn } from '@storybook/react'

import LeftMenu from './LeftMenu'

export const generated: StoryFn<typeof LeftMenu> = (args) => {
  return <LeftMenu {...args} />
}

export default {
  title: 'LeftMenu',
  component: LeftMenu,
} as Meta<typeof LeftMenu>
