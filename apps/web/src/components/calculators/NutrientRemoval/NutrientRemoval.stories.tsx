import { Meta, StoryFn } from '@storybook/react'
import { NutrientRemoval, NutrientRemovalProps } from './NutrientRemoval'
import { MockedProvider } from '@apollo/client/testing'
import { GET_NUTRIENT_REMOVAL_RATES } from '../../../graphql/queries'
import {
  Tag,
  TagsByCategoryNameDocument,
  UnitOfMeasurementDocument,
} from '../../../graphql/generated/graphql'

export default {
  title: 'NutrientRemoval',
  component: NutrientRemoval,
  decorators: [
    Story => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: UnitOfMeasurementDocument,
              variables: {
                input: {},
              },
            },
            result: {
              data: {
                unitOfMeasurements: {
                  items: [
                    {
                      id: '1',
                      unitName: 'Bushels',
                    },
                    {
                      id: '2',
                      unitName: 'ton',
                    },
                  ],
                },
              },
            },
          },
          {
            request: {
              query: TagsByCategoryNameDocument,
              variables: {
                input: {
                  categoryName: 'Crop Year',
                },
              },
            },
            result: {
              data: {
                tagsByCategoryName: {
                  totalCount: 2,
                  items: [
                    {
                      id: 1,
                      name: '2022',
                      color: null,
                      colorIndex: 1,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 2,
                      name: '2023',
                      color: null,
                      colorIndex: 2,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 3,
                      name: '2024',
                      color: null,
                      colorIndex: 3,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 4,
                      name: '2025',
                      color: null,
                      colorIndex: 4,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
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
              query: TagsByCategoryNameDocument,
              variables: {
                input: {
                  categoryName: 'Crop',
                },
              },
            },
            result: {
              data: {
                tagsByCategoryName: {
                  totalCount: 2,
                  items: [
                    {
                      id: 1,
                      name: 'Corn',
                      color: null,
                      colorIndex: 1,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 2,
                      name: 'Soybeans',
                      color: null,
                      colorIndex: 2,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 3,
                      name: 'Wheat',
                      color: null,
                      colorIndex: 3,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
                        color: null,
                        icon: null,
                      },
                    },
                    {
                      id: 4,
                      name: 'Cotton',
                      color: null,
                      colorIndex: 4,
                      icon: null,
                      description: null,
                      tagCategory: {
                        tagCategoryName: 'Crop Year',
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
              query: GET_NUTRIENT_REMOVAL_RATES,
              variables: {
                companyId: '11111111-1111-1111-1111-111111111111',
              },
            },
            result: {
              data: {
                getNutrientRemovalRates: {
                  nutrientRemovalRates: [
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Corn',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 1,
                      nutrient: {
                        id: 1,
                        tagName: 'Nitrogen',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 1.6,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Corn',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 2,
                      nutrient: {
                        id: 2,
                        tagName: 'Phosphor',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 0.32,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Corn',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 3,
                      nutrient: {
                        id: 3,
                        tagName: 'Potassium',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 1.2,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Corn',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 4,
                      nutrient: {
                        id: 4,
                        tagName: 'Sulfur',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 0.18,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Soybeans',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 5,
                      nutrient: {
                        id: 5,
                        tagName: 'Nitrogen',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 3.3,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Soybeans',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 6,
                      nutrient: {
                        id: 6,
                        tagName: 'Phosphor',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 0.72,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Soybeans',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 7,
                      nutrient: {
                        id: 7,
                        tagName: 'Potassium',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 1.2,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                    {
                      year: 2021,
                      crop_id: 1,
                      crop: {
                        id: 1,
                        tagName: 'Soybeans',
                        tagCategoryName: {
                          tagCategoryName: 'Crop',
                        },
                        color_index: 0,
                      },
                      nutrientId: 4,
                      nutrient: {
                        id: 4,
                        tagName: 'Sulfur',
                        tagCategoryName: {
                          tagCategoryName: 'Nutrient',
                        },
                        color_index: 0,
                      },
                      removalRateValue: 0.18,
                      removalRateUnit: {
                        id: 1,
                        unitName: 'Bushels',
                      },
                    },
                  ],
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

const Template: StoryFn<NutrientRemovalProps> = args => {
  return (
    <>
      <NutrientRemoval {...args} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
