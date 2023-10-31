import { Meta, StoryFn } from '@storybook/react'
import { CompanySearchBox, CompanySearchBoxProps } from './CompanySearchBox'
import { GET_COMPANIES } from '../../../graphql/companies/queries'
import { MockedProvider } from '@apollo/client/testing'

export default {
  title: 'CompanySearchBox',
  component: CompanySearchBox,
  decorators: [
    Story => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COMPANIES,
              variables: { page: 0, perPage: 50, searchTerm: 'Mock' },
            },
            result: {
              data: {
                getCompanies: {
                  companies: [
                    // Add mock company data here
                    {
                      id: '1',
                      companyName: 'Mock Company 1',
                    },
                    {
                      id: '2',
                      companyName: 'Mock Company 2',
                    },
                  ],
                  totalCount: 2,
                },
              },
            },
          },
          {
            request: {
              query: GET_COMPANIES,
              variables: {
                page: 0,
                perPage: 50,
                searchTerm: 'Mock Company 1',
              },
            },
            result: {
              data: {
                getCompanies: {
                  companies: [
                    {
                      id: '1',
                      companyName: 'Mock Company 1',
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

const Template: StoryFn<CompanySearchBoxProps> = args => (
  <CompanySearchBox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onCompanySelect: company => console.log('Selected company:', company),
}
