import type { Meta, StoryFn } from '@storybook/react'

import Loading from './Loading'

export const generated: StoryFn<typeof Loading> = (args) => {
  return <Loading {...args} />
}

export default {
  title: 'Loading Indicator',
  component: Loading,
} as Meta<typeof Loading>
