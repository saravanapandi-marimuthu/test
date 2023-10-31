import {
  EnterpriseItemWithRelations,
  FieldWithRelations,
} from '../../database/fields/types/fieldTypeExtensions'
import { EnterpriseItem, FieldInfo } from '../generated/graphql'

export const mapPrismaEnterpriseItemToGraphqlEnterpriseItem = (
  item: EnterpriseItemWithRelations,
): EnterpriseItem => {
  if (!item) return null

  return {
    ...item,
    billingSplitGroup: {
      ...item.billingSplitGroup,
      ...item.billingSplitGroup.splitItems,
    },
  }
}

export const mapPrismaFieldToGraphqlField = (
  item: FieldWithRelations,
): FieldInfo => {
  if (!item) return null

  return {
    ...item,
    fieldTags: item.fieldTags.map(fieldTag => {
      return {
        ...fieldTag,
        tag: {
          ...fieldTag.tag,
          tagCategory: {
            ...fieldTag.tag.tagCategory,
          },
        },
      }
    }),
    fieldVersions:
      item.fieldVersions &&
      item.fieldVersions.map(fieldVersion => {
        return {
          ...fieldVersion,
          fieldVersionTags:
            fieldVersion.fieldVersionTags &&
            fieldVersion.fieldVersionTags.map(fieldVersionTag => {
              return {
                ...fieldVersionTag,
                tag: {
                  ...fieldVersionTag.tag,
                  tagCategory: {
                    ...fieldVersionTag.tag.tagCategory,
                  },
                },
              }
            }),
        }
      }),
  }
}
