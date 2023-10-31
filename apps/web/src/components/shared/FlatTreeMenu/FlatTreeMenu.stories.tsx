import type { Meta, StoryFn } from '@storybook/react'

import FlatTreeMenu from './FlatTreeMenu'

export const generated: StoryFn<typeof FlatTreeMenu> = args => {
  return <FlatTreeMenu {...args} />
}

export default {
  title: 'FlatTreeMenu',
  component: FlatTreeMenu,
} as Meta<typeof FlatTreeMenu>
