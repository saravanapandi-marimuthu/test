import type { Meta, StoryFn } from '@storybook/react'

import PercentPicker from './PercentPicker'

export const generated: StoryFn<typeof PercentPicker> = args => {
  return <PercentPicker {...args} value={10} />
}

export default {
  title: 'PercentPicker',
  component: PercentPicker,
} as Meta<typeof PercentPicker>
