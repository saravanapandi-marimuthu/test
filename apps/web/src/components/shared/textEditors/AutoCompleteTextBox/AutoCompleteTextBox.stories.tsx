import { Meta, StoryFn } from '@storybook/react'
import { MockedProvider } from '@apollo/client/testing'
import {
  AutoCompleteTextBox,
  AutoCompleteTextBoxProps,
} from './AutoCompleteTextBox'
import { GET_TAGS } from '../../../../graphql/queries'

export default {
  title: 'AutoCompleteTextBox',
  component: AutoCompleteTextBox,
} as Meta

const Template: StoryFn<AutoCompleteTextBoxProps> = args => {
  return (
    <>
      <div>
        <p>Without title</p>
        <AutoCompleteTextBox {...args} />
      </div>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'tagName',
  selectedItems: '',
  isLabel: false,
  onEditSave: () => {},
}
