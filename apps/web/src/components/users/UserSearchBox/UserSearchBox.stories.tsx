import { Meta, StoryFn } from '@storybook/react'
import { GET_USERS } from '../../../graphql/queries'
import { MockedProvider } from '@apollo/client/testing'
import { UserSearchBox, UserSearchBoxProps } from './UserSearchBox'

export default {
  title: 'UserSearchBox',
  component: UserSearchBox,
  decorators: [
    Story => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_USERS,
              variables: { page: 1, perPage: 50, searchTerm: '' },
            },
            result: {
              data: {
                getUsers: {
                  users: [
                    // Add mock company data here
                    {
                      id: '1',
                      username: 'User 1',
                      email: 'user1@test.com',
                      roleCount: 1,
                    },
                    {
                      id: '2',
                      username: 'User 2',
                      email: 'user2@test.com',
                      roleCount: 0,
                    },
                  ],
                  totalCount: 2,
                },
              },
            },
          },
          {
            request: {
              query: GET_USERS,
              variables: { page: 1, perPage: 50, searchTerm: 'User 1' },
            },
            result: {
              data: {
                getUsers: {
                  users: [
                    {
                      id: '1',
                      username: 'User 1',
                      email: 'user1@test.com',
                      roleCount: 1,
                    },
                  ],
                  totalCount: 1,
                },
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

const Template: StoryFn<UserSearchBoxProps> = args => (
  <UserSearchBox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onUserSelect: user => console.log('Selected user:', user),
}
