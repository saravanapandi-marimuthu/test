/*
export const defaultUnits: Array<{
  singularName: string
  pluralName: string
  unitName: string
  baseUnitName?: string
  conversionFactor?: number
  colorIndex?: number
}> = [
  {
    singularName: 'Liquid Ounce',
    pluralName: 'Liquid Ounces',
    unitName: 'fl oz',
    colorIndex: 0,
  },
  {
    singularName: 'Pint',
    pluralName: 'Pints',
    unitName: 'pt',
    baseUnitName: 'fl oz',
    conversionFactor: 16,
    colorIndex: 1,
  },
  {
    singularName: 'Quart',
    pluralName: 'Quarts',
    unitName: 'qt',
    baseUnitName: 'fl oz',
    conversionFactor: 32,
    colorIndex: 2,
  },
  {
    singularName: 'Gallon',
    pluralName: 'Gallons',
    unitName: 'gal',
    baseUnitName: 'fl oz',
    conversionFactor: 128,
    colorIndex: 3,
  },
  {
    singularName: 'Dry Ounce',
    pluralName: 'Dry Ounces',
    unitName: 'oz',
    colorIndex: 4,
  },
  {
    singularName: 'Pound',
    pluralName: 'Pounds',
    unitName: 'lb',
    baseUnitName: 'oz',
    conversionFactor: 16,
    colorIndex: 5,
  },
  {
    singularName: 'Square Foot',
    pluralName: 'Square Feet',
    unitName: 'sq ft',
    colorIndex: 6,
  },
  {
    singularName: 'Acre',
    pluralName: 'Acres',
    unitName: 'acre',
    baseUnitName: 'sq ft',
    conversionFactor: 43560,
    colorIndex: 7,
  },
  {
    singularName: 'Cubic Foot',
    pluralName: 'Cubic Feet',
    unitName: 'cu ft',
    colorIndex: 8,
  },
  {
    singularName: 'Bushel',
    pluralName: 'Bushels',
    unitName: 'bu',
    baseUnitName: 'cu ft',
    conversionFactor: 1.244456,
    colorIndex: 9,
  },
  {
    singularName: 'CWT',
    pluralName: 'CWT',
    unitName: 'cwt',
    baseUnitName: 'lb',
    conversionFactor: 100,
    colorIndex: 10,
  },
]

export const defaultCompoundUnits: Array<{
  singularName: string
  pluralName: string
  unitName: string
  numeratorUnitName: string
  denominatorUnitName: string
  colorIndex?: number
}> = [
  {
    singularName: 'Fluid Ounce per Gallon',
    pluralName: 'Fluid Ounces per Gallon',
    unitName: 'fl oz/gal',
    numeratorUnitName: 'fl oz',
    denominatorUnitName: 'gal',
    colorIndex: 0,
  },
  {
    singularName: 'Fluid Ounce per Acre',
    pluralName: 'Fluid Ounces per Acre',
    unitName: 'fl oz/acre',
    numeratorUnitName: 'fl oz',
    denominatorUnitName: 'acre',
    colorIndex: 1,
  },
  {
    singularName: 'Fluid Ounce per Gallon',
    pluralName: 'Fluid Ounces per Gallon',
    unitName: 'fl oz/gal',
    numeratorUnitName: 'fl oz',
    denominatorUnitName: 'gal',
    colorIndex: 2,
  },
  {
    singularName: 'Pound per Gallon',
    pluralName: 'Pounds per Gallon',
    unitName: 'lb/gal',
    numeratorUnitName: 'lb',
    denominatorUnitName: 'gal',
    colorIndex: 3,
  },
  {
    singularName: 'Pound per Acre',
    pluralName: 'Pounds per Acre',
    unitName: 'lb/acre',
    numeratorUnitName: 'lb',
    denominatorUnitName: 'acre',
    colorIndex: 4,
  },
]
*/

import { UnitOfMeasurementType } from '../client'

export const defaultUnits: Array<{
  unitName: string
  singularName?: string
  pluralName?: string
  unitOfMeasurementType?: UnitOfMeasurementType
  numeratorMultiplier?: number
  numeratorUnitName?: string
  denominatorMultiplier?: number
  denominatorUnitName?: string
  numeratorUnitType?: UnitOfMeasurementType
  denominatorUnitType?: UnitOfMeasurementType

  baseUnitName?: string
  conversionFactor?: number
  colorIndex?: number
}> = [
  {
    unitName: 'oz',
    singularName: 'ounce',
    pluralName: 'ounces',
    unitOfMeasurementType: UnitOfMeasurementType.WEIGHT,
    conversionFactor: 1,
    colorIndex: 1,
  },
  {
    unitName: 'lb',
    singularName: 'pound',
    pluralName: 'pounds',
    unitOfMeasurementType: UnitOfMeasurementType.WEIGHT,
    baseUnitName: 'oz',
    conversionFactor: 16,
    colorIndex: 2,
  },
  {
    unitName: 'ton',
    singularName: 'ton',
    pluralName: 'tons',
    unitOfMeasurementType: UnitOfMeasurementType.WEIGHT,
    baseUnitName: 'oz',
    conversionFactor: 32000,
    colorIndex: 3,
  },
  {
    unitName: 'fl oz',
    singularName: 'fluid ounce',
    pluralName: 'fluid ounces',
    unitOfMeasurementType: UnitOfMeasurementType.VOLUME,
    conversionFactor: 1,
    colorIndex: 4,
  },
  {
    unitName: 'pt',
    singularName: 'pint',
    pluralName: 'pints',
    unitOfMeasurementType: UnitOfMeasurementType.VOLUME,
    baseUnitName: 'fl oz',
    conversionFactor: 16,
    colorIndex: 5,
  },
  {
    unitName: 'qt',
    singularName: 'quart',
    pluralName: 'quarts',
    unitOfMeasurementType: UnitOfMeasurementType.VOLUME,
    baseUnitName: 'fl oz',
    conversionFactor: 32,
    colorIndex: 6,
  },
  {
    unitName: 'gal',
    singularName: 'gallon',
    pluralName: 'gallons',
    unitOfMeasurementType: UnitOfMeasurementType.VOLUME,
    baseUnitName: 'fl oz',
    conversionFactor: 128,
    colorIndex: 7,
  },
  {
    unitName: 'lb/gal',
    singularName: 'pound per gallon',
    pluralName: 'pounds per gallon',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'lb',
    denominatorMultiplier: 1,
    denominatorUnitName: 'gal',
    numeratorUnitType: UnitOfMeasurementType.WEIGHT,
    denominatorUnitType: UnitOfMeasurementType.VOLUME,
    colorIndex: 8,
  },
  {
    unitName: 'oz/qt',
    singularName: 'ounce per quart',
    pluralName: 'ounces per quart',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'oz',
    denominatorMultiplier: 1,
    denominatorUnitName: 'qt',
    numeratorUnitType: UnitOfMeasurementType.WEIGHT,
    denominatorUnitType: UnitOfMeasurementType.VOLUME,
    colorIndex: 9,
  },
  {
    unitName: 'ton/pt',
    singularName: 'ton per pint',
    pluralName: 'tons per pint',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'ton',
    denominatorMultiplier: 1,
    denominatorUnitName: 'pt',
    numeratorUnitType: UnitOfMeasurementType.WEIGHT,
    denominatorUnitType: UnitOfMeasurementType.VOLUME,
    colorIndex: 10,
  },
  {
    unitName: 'oz/gal',
    singularName: 'ounce per gallon',
    pluralName: 'ounces per gallon',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'oz',
    denominatorMultiplier: 1,
    denominatorUnitName: 'gal',
    numeratorUnitType: UnitOfMeasurementType.WEIGHT,
    denominatorUnitType: UnitOfMeasurementType.VOLUME,
    colorIndex: 11,
  },
  {
    unitName: 'ton/qt',
    singularName: 'ton per quart',
    pluralName: 'tons per quart',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'ton',
    denominatorMultiplier: 1,
    denominatorUnitName: 'qt',
    numeratorUnitType: UnitOfMeasurementType.WEIGHT,
    denominatorUnitType: UnitOfMeasurementType.VOLUME,
    colorIndex: 12,
  },
  {
    unitName: 'sq in',
    singularName: 'square inch',
    pluralName: 'square inches',
    unitOfMeasurementType: UnitOfMeasurementType.AREA,
    conversionFactor: 1,
    colorIndex: 13,
  },
  {
    unitName: 'sq ft',
    singularName: 'square foot',
    pluralName: 'square feet',
    unitOfMeasurementType: UnitOfMeasurementType.AREA,
    baseUnitName: 'sq in',
    conversionFactor: 144, // 144 square inches in a square foot
    colorIndex: 14,
  },
  {
    unitName: 'acre',
    singularName: 'acre',
    pluralName: 'acres',
    unitOfMeasurementType: UnitOfMeasurementType.AREA,
    baseUnitName: 'sq in',
    conversionFactor: 6272640, // square inches in an acre
    colorIndex: 0,
  },
  {
    unitName: 'lb/acre',
    singularName: 'pound per acre',
    pluralName: 'pounds per acre',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'lb',
    denominatorMultiplier: 1,
    denominatorUnitName: 'acre',
    numeratorUnitType: UnitOfMeasurementType.WEIGHT,
    denominatorUnitType: UnitOfMeasurementType.AREA,
    colorIndex: 1,
  },
  {
    unitName: 'oz/ sq ft',
    singularName: 'ounce per square foot',
    pluralName: 'ounces per square foot',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'oz',
    denominatorMultiplier: 1,
    denominatorUnitName: 'sq ft',
    numeratorUnitType: UnitOfMeasurementType.WEIGHT,
    denominatorUnitType: UnitOfMeasurementType.AREA,
    colorIndex: 2,
  },
  {
    unitName: 'gal/acre',
    singularName: 'gallon per acre',
    pluralName: 'gallons per acre',
    unitOfMeasurementType: UnitOfMeasurementType.RATE,
    numeratorMultiplier: 1,
    numeratorUnitName: 'gal',
    denominatorMultiplier: 1,
    denominatorUnitName: 'acre',
    numeratorUnitType: UnitOfMeasurementType.VOLUME,
    denominatorUnitType: UnitOfMeasurementType.AREA,
    colorIndex: 3,
  },
]
