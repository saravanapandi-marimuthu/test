import { StoryFn, Meta } from '@storybook/react'

import UserHomePage from './UserHomePage'

export default {
  title: 'UserHomePage',
  component: UserHomePage,
  argTypes: {},
} as Meta<typeof UserHomePage>

const Template: StoryFn<typeof UserHomePage> = (args) => (
  <UserHomePage {...args} />
)

export const Default = Template.bind({})

Default.args = {}
