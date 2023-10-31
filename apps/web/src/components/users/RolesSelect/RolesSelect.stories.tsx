import { Meta, StoryFn } from '@storybook/react'
import { RolesSelect, RolesSelectProps } from './RolesSelect'
import { GET_AVAILABLE_ROLES } from '../../../graphql/queries'
import { MockedProvider } from '@apollo/client/testing'

export default {
  title: 'RolesSelect',
  component: RolesSelect,
  decorators: [
    Story => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_AVAILABLE_ROLES,
            },
            result: {
              data: {
                getAvailableRoles: [
                  {
                    id: 'SU',
                    description: 'Super Admin',
                  },
                  {
                    id: 'ADMIN',
                    description: 'Company Admin',
                  },
                ],
              },
            },
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
} as Meta

const Template: StoryFn<RolesSelectProps> = args => <RolesSelect {...args} />

export const Default = Template.bind({})

Default.args = {
  onRoleSelect: role => console.log('Selected role:', role),
}
