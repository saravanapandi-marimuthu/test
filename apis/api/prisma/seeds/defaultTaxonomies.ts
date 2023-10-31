import { TaxonomyInput } from '../../src/services/database/configurations/taxonomies/createTaxonomy'

export const defaultTaxonomies: TaxonomyInput[] = [
  {
    taxonomyName: 'Product/Service Type', // Offering type
    taxonomyLevel: 0,
    colorIndex: 0,
    children: [
      {
        taxonomyName: 'Product',
        description: 'Product',
        taxonomyLevel: 1,
        colorIndex: 1,
        children: [
          {
            taxonomyName: 'Chemical',
            description: 'Product - Chemical',
            taxonomyLevel: 2,
            colorIndex: 2,
            children: [
              {
                taxonomyName: 'Herbicide',
                description: 'Product - Chemical - Herbicide',
                taxonomyLevel: 3,
                colorIndex: 0,
              },
              {
                taxonomyName: 'Insecticide',
                description: 'Product - Chemical - Insecticide',
                taxonomyLevel: 4,
                colorIndex: 1,
              },
              {
                taxonomyName: 'Fungicide',
                description: 'Product - Chemical - Fungicide',
                taxonomyLevel: 4,
                colorIndex: 2,
              },
              {
                taxonomyName: 'Adjuvant',
                description: 'Product - Chemical - Adjuvant',
                taxonomyLevel: 4,
                colorIndex: 3,
              },
            ],
          },
          {
            taxonomyName: 'Seed',
            description: 'Product - Seed',
            taxonomyLevel: 2,
            colorIndex: 3,
          },
          {
            taxonomyName: 'Fertilizer',
            description: 'Product - Fertilizer',
            taxonomyLevel: 2,
            colorIndex: 4,
          },
        ],
      },
      {
        taxonomyName: 'Service',
        description: 'Service',
        taxonomyLevel: 2,
        colorIndex: 2,
      },
    ],
  },
  {
    taxonomyName: 'Billing Split Tier',
    description: 'Billing Split Tier',
    taxonomyLevel: 0,
    colorIndex: 0,
    children: [
      {
        taxonomyName: 'Products',
        description: 'Products',
        taxonomyLevel: 1,
        colorIndex: 1,
        children: [
          {
            taxonomyName: 'Fuel',
            description: 'Products - Fuel',
            taxonomyLevel: 2,
            colorIndex: 2,
            children: [
              {
                taxonomyName: 'Fuel Product',
                description: 'Products - Fuel - Product',
                taxonomyLevel: 3,
                colorIndex: 3,
              },
            ],
          },
          {
            taxonomyName: 'Chemicals',
            description: 'Products - Chemicals',
            taxonomyLevel: 2,
            colorIndex: 3,
            children: [
              {
                taxonomyName: 'Chemical',
                description: 'Products - Chemicals - Product',
                taxonomyLevel: 3,
                colorIndex: 4,
              },
            ],
          },
          {
            taxonomyName: 'Seeds',
            description: 'Products - Seeds',
            taxonomyLevel: 2,
            colorIndex: 4,
            children: [
              {
                taxonomyName: 'Seed',
                description: 'Products - Seeds - Product',
                taxonomyLevel: 3,
                colorIndex: 5,
              },
            ],
          },
          {
            taxonomyName: 'Fertilizer',
            description: 'Products - Fertilizer',
            taxonomyLevel: 2,
            colorIndex: 5,
            children: [
              {
                taxonomyName: 'Fertilizer Product',
                description: 'Products - Fertilizer - Product',
                taxonomyLevel: 3,
                colorIndex: 6,
              },
            ],
          },
          {
            taxonomyName: 'Others',
            description: 'Products - Others',
            taxonomyLevel: 2,
            colorIndex: 6,
            children: [
              {
                taxonomyName: 'Other Product',
                description: 'Products - Other Product',
                taxonomyLevel: 3,
                colorIndex: 7,
              },
            ],
          },
        ],
      },
      {
        taxonomyName: 'Services',
        description: 'Services',
        taxonomyLevel: 1,
        colorIndex: 2,
        children: [
          {
            taxonomyName: 'Applications',
            description: 'Service - Application',
            taxonomyLevel: 2,
            colorIndex: 3,
            children: [
              {
                taxonomyName: 'Application',
                description: 'Services - Application - Service',
                taxonomyLevel: 3,
                colorIndex: 4,
              },
            ],
          },
          {
            taxonomyName: 'SoilSampling',
            description: 'Service - SoilSampling',
            taxonomyLevel: 2,
            colorIndex: 4,
          },
          {
            taxonomyName: 'Scouting',
            description: 'Service - Scouting',
            taxonomyLevel: 2,
            colorIndex: 5,
          },
          {
            taxonomyName: 'Delivery',
            description: 'Service - Delivery',
            taxonomyLevel: 2,
            colorIndex: 6,
          },
          {
            taxonomyName: 'ArialImagery',
            description: 'Service - ArialImagery',
            taxonomyLevel: 2,
            colorIndex: 7,
          },
          {
            taxonomyName: 'Other Services',
            description: 'Service - Other',
            taxonomyLevel: 2,
            colorIndex: 8,
            children: [
              {
                taxonomyName: 'Other Service',
                description: 'Services - Other Service',
                taxonomyLevel: 3,
                colorIndex: 9,
              },
            ],
          },
        ],
      },
    ],
  },
] //as Taxonomy[]
