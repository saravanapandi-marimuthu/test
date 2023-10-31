import { Meta, StoryFn } from '@storybook/react'
import { AddChemistryOrder, AddChemistryOrderProps } from './AddChemistryOrder'
import { MockedProvider } from '@apollo/client/testing'
import { GET_ACCOUNT_ENTERPRISE_ITEMS } from '../../../graphql/enterpriseItems/queries'
import { GET_COMPANIES } from '../../../graphql/companies/queries'
import { GET_TAGS } from '../../../graphql/queries'

export default {
  title: 'AddChemistryOrder',
  component: AddChemistryOrder,
  decorators: [
    Story => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_TAGS,
              variables: {
                filters: [],
                sort: '',
                searchTerm: '',
                perPage: 9999,
                page: 0,
                tagCategoryName: 'Order Type',
              },
            },
            result: {
              data: {
                getTags: {
                  totalCount: 2,
                  tags: [
                    {
                      id: 1,
                      tagName: 'Chemistry Application',
                      color: null,
                      colorIndex: 1,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Order Type',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 2,
                      tagName: 'Fertilizer Application',
                      color: null,
                      colorIndex: 2,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Order Type',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 3,
                      tagName: 'Seed',
                      color: null,
                      colorIndex: 3,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Order Type',
                        color: null,
                        icon: null,
                      },
                    },
                  ],
                  error: null,
                },
              },
            },
          },
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
              query: GET_ACCOUNT_ENTERPRISE_ITEMS,
              variables: {
                input: {
                  companyId: '11111111-1111-1111-1111-111111111111',
                  accountId: '',
                },
              },
            },
            result: {
              data: {
                getAccountEnterpriseItems: [
                  {
                    field: {
                      id: 1,
                      fieldName: 'North Field',
                      active: true,
                      plssLocation: 'PLSS LOC 1234',
                      plssLocationState: 'IA',
                      notes: 'Test Notes',
                      geoLocation: {
                        latitude: 41.5127,
                        longitude: -94.3806,
                      },
                      fieldTags: [
                        {
                          tag: {
                            tagName: 'Corn',
                            colorIndex: 0,
                            tagCategory: {
                              tagCategoryName: 'Crop',
                              __typename: 'TagCategory',
                            },
                          },
                        },
                        {
                          tag: {
                            tagName: 'Soybeans',
                            colorIndex: 1,
                            tagCategory: {
                              tagCategoryName: 'Crop',
                              __typename: 'TagCategory',
                            },
                          },
                        },
                      ],
                      fieldVersions: [
                        {
                          id: 1,
                          active: true,
                          startDate: '2023-09-28T13:36:06.307Z',
                          estimatedArea: 78.19,
                          fieldVersionTags: null,
                          fieldLayers: [
                            {
                              id: 1,
                              geoJsonData: {
                                type: 'FeatureCollection',
                                features: [
                                  {
                                    type: 'Feature',
                                    geometry: {
                                      type: 'Polygon',
                                      coordinates: [
                                        [
                                          [
                                            -94.38537275529967,
                                            41.51448076442916,
                                          ],
                                          [
                                            -94.37595283723937,
                                            41.51454503340641,
                                          ],
                                          [
                                            -94.37584554887877,
                                            41.51092980427706,
                                          ],
                                          [
                                            -94.38541567064391,
                                            41.51091373614137,
                                          ],
                                        ],
                                      ],
                                    },
                                    properties: {
                                      name: 'North Field',
                                      description: '',
                                      polygonType: 'outer',
                                    },
                                  },
                                  {
                                    type: 'Feature',
                                    geometry: {
                                      type: 'Polygon',
                                      coordinates: [
                                        [
                                          [
                                            -94.38075935579405,
                                            41.51419155324186,
                                          ],
                                          [
                                            -94.37827026582823,
                                            41.51335604699758,
                                          ],
                                          [
                                            -94.37981521822081,
                                            41.5125365977058,
                                          ],
                                          [
                                            -94.38088810182677,
                                            41.51105834921906,
                                          ],
                                          [
                                            -94.38050186372863,
                                            41.51107441731886,
                                          ],
                                          [-94.3794718954669, 41.5125526654387],
                                          [
                                            -94.37773382402526,
                                            41.51332391192668,
                                          ],
                                          [
                                            -94.3759957525836,
                                            41.51268120715816,
                                          ],
                                          [
                                            -94.37597429491149,
                                            41.51292222219416,
                                          ],
                                          [
                                            -94.38067352510558,
                                            41.51438436084364,
                                          ],
                                        ],
                                      ],
                                    },
                                    properties: { polygonType: 'inner' },
                                  },
                                  {
                                    type: 'Feature',
                                    geometry: {
                                      type: 'Point',
                                      coordinates: [
                                        -94.3765536520587, 41.51435222628323,
                                      ],
                                    },
                                    properties: {},
                                  },
                                ],
                              },
                              fieldLayerZones: [],
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    field: {
                      id: 2,
                      fieldName: 'South Farm',
                      active: true,
                      plssLocation: 'PLSS 3456',
                      plssLocationState: 'IA',
                      notes: 'Test Notes',
                      geoLocation: {
                        latitude: 41.5065,
                        longitude: -94.3858,
                      },
                      fieldTags: [
                        {
                          tag: {
                            tagName: 'Corn',
                            colorIndex: 0,
                            tagCategory: {
                              tagCategoryName: 'Crop',
                              __typename: 'TagCategory',
                            },
                          },
                        },
                        {
                          tag: {
                            tagName: 'Soybeans',
                            colorIndex: 1,
                            tagCategory: {
                              tagCategoryName: 'Crop',
                              __typename: 'TagCategory',
                            },
                          },
                        },
                      ],
                      fieldVersions: [
                        {
                          id: 2,
                          active: true,
                          startDate: '2023-09-28T15:00:29.482Z',
                          estimatedArea: 40.07,
                          fieldVersionTags: null,
                          fieldLayers: [
                            {
                              id: 2,
                              geoJsonData: {
                                type: 'FeatureCollection',
                                features: [
                                  {
                                    type: 'Feature',
                                    geometry: {
                                      type: 'Polygon',
                                      coordinates: [
                                        [
                                          [
                                            -94.38795072693014,
                                            41.50864830202534,
                                          ],
                                          [
                                            -94.3836377348342,
                                            41.50847154608429,
                                          ],
                                          [-94.3836377348342, 41.5044703052298],
                                          [
                                            -94.38797218460226,
                                            41.50456672357945,
                                          ],
                                        ],
                                      ],
                                    },
                                    properties: { polygonType: 'outer' },
                                  },
                                  {
                                    type: 'Feature',
                                    geometry: {
                                      type: 'Polygon',
                                      coordinates: [
                                        [
                                          [
                                            -94.38690715512394,
                                            41.50480362736189,
                                          ],
                                          [
                                            -94.38514762601017,
                                            41.50478755770572,
                                          ],
                                          [
                                            -94.38516908368229,
                                            41.50453044266447,
                                          ],
                                          [
                                            -94.38703590115665,
                                            41.50461079122455,
                                          ],
                                        ],
                                      ],
                                    },
                                    properties: { polygonType: 'inner' },
                                  },
                                ],
                              },
                              fieldLayerZones: [],
                            },
                          ],
                        },
                      ],
                    },
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

const Template: StoryFn<AddChemistryOrderProps> = args => {
  return (
    <>
      <AddChemistryOrder {...args} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
