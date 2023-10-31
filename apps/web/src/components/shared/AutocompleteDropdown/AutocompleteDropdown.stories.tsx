import { Meta, StoryFn } from '@storybook/react'
import { AutocompleteDropdown, AutocompleteDropdownProps } from './AutocompleteDropdown'
import { MockedProvider } from '@apollo/client/testing'

export default {
  title: 'AutocompleteDropdown',
  component: AutocompleteDropdown,
} as Meta

const Template: StoryFn<AutocompleteDropdownProps> = args => (
  <AutocompleteDropdown {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onSelect: value => console.log('Selected value:', value),
  data: [
    // Add mock company data here
    {
      id: '1',
      name: 'Mock Company 1',
    },
    {
      id: '2',
      name: 'Mock Company 2',
    },
  ],
  loading: false,
  setDebouncedSearchTerm: () => {},
}
