// USMap.stories.tsx
import { StoryFn, Meta } from '@storybook/react'
import ResponsiveTable from './ResponsiveTable'

export default {
  title: 'ResponsiveTable',
  component: ResponsiveTable,
  argTypes: {
    stateFlags: {
      control: 'object',
    },
  },
} as Meta<typeof ResponsiveTable>

const Template: StoryFn<typeof ResponsiveTable> = (args) => (
  <ResponsiveTable {...args} />
)

const data = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob', email: 'bob@example.com' },
]

const headers = ['name', 'email']
const sortableFields = ['name', 'email']

export const Default = Template.bind({})

Default.args = {
  data,
  headers,
  sortableFields,
  onUpdate: (item: any) => console.log('Update', item),
  onDelete: (item: any) => console.log('Delete', item),
}
