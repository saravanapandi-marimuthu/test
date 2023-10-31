import { StoryFn, Meta } from '@storybook/react'
import QuickAccessTile from './QuickAccessTile'

import { Home as HomeIcon } from '@mui/icons-material'

export default {
  title: 'QuickAccessTile',
  component: QuickAccessTile,
  //argTypes: {},
} as Meta<typeof QuickAccessTile>

const Template: StoryFn<typeof QuickAccessTile> = (args) => (
  <QuickAccessTile {...args} />
)

export const Default = Template.bind({})

Default.args = {
  title: 'Companies',
  subtitle: 'Add, remove or modify companies',
  icon: (
    <div>
      <HomeIcon />
    </div>
  ),
  onAction: () => {
    console.log('Navigate to Companies')
  },
}
