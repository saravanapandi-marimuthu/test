// USMap.stories.tsx
import { StoryFn, Meta } from '@storybook/react'
import USMap from './USMap'

export default {
  title: 'USMap',
  component: USMap,
  argTypes: {
    stateFlags: {
      control: 'object',
    },
  },
} as Meta<typeof USMap>

const Template: StoryFn<typeof USMap> = (args) => <USMap {...args} />

export const Default = Template.bind({})
Default.args = {
  stateFlags: {
    California: 1, // California // 06
    Texas: 0, // Texas // 48
    Florida: 1, // Florida // 12
    Alaska: 1,
    Oregon: 1,
  },
}
