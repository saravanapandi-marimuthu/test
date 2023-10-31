import { Meta, StoryFn } from '@storybook/react'
import { MockedProvider } from '@apollo/client/testing'
import { DropdownTextBox, DropdownTextBoxProps } from './DropdownTextBox'
import { GET_TAGS } from '../../../../graphql/queries'

export default {
  title: 'DropdownTextBox',
  component: DropdownTextBox,
} as Meta

const Template: StoryFn<DropdownTextBoxProps> = args => {
  return (
    <>
      <div>
        <p>Without title</p>
        <DropdownTextBox {...args} />
      </div>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'tagName',
  items: [
    {
      id: 1,
      name: 'Farm',
    },
    {
      id: 2,
      name: 'ShipTo',
    },
  ],
  selectedItems: [],
  onEditSave: () => {},
}
