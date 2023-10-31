// import { Maybe } from 'graphql/jsutils/Maybe'

// export enum GetTagsError {
//   TAG_CATEGORY_NOT_FOUND = 'TAG_CATEGORY_NOT_FOUND',
//   UNKNOWN_ERROR = 'UNKNOWN_ERROR',
// }

// export enum UpdateTagCategoryError {
//   TAG_CATEGORY_NOT_FOUND = 'TAG_CATEGORY_NOT_FOUND',
//   UNKNOWN_ERROR = 'UNKNOWN_ERROR',
// }

// // export interface UpdateTagCategoryData {
// //   updateTagCategory: {
// //     tagCategory: Partial<TagCategory> | null
// //     error: UpdateTagCategoryError | null
// //   }
// // }

// // export enum CreateTagCategoryError {
// //   TAG_CATEGORY_ALREADY_EXISTS = 'TAG_CATEGORY_ALREADY_EXISTS',
// //   UNKNOWN_ERROR = 'UNKNOWN_ERROR',
// // }

// // export interface CreateTagCategoryData {
// //   createTagCategory: {
// //     tagCategory: Partial<TagCategory> | null
// //     error: CreateTagCategoryError | null
// //   }
// // }

// export enum CreateTagError {
//   TAG_ALREADY_EXISTS = 'TAG_ALREADY_EXISTS',
//   TAG_CATEGORY_NOT_FOUND = 'TAG_CATEGORY_NOT_FOUND',
//   INVALID_TAG_CATEGORY = 'INVALID_TAG_CATEGORY',
//   UNKNOWN_ERROR = 'UNKNOWN_ERROR',
// }

// export interface CreateTagData {
//   createTag: {
//     tag: Partial<Tag> | null
//     error: CreateTagError | null
//   }
// }

// export enum UpdateTagError {
//   INVALID_INPUT = 'INVALID_INPUT',
//   INVALID_TAG_ID = 'INVALID_TAG_ID',
//   UNKNOWN_ERROR = 'UNKNOWN_ERROR',
// }

// export interface UpdateTagData {
//   updateTag: {
//     tag: Partial<Tag> | null
//     error: UpdateTagError | null
//   }
// }

// export interface GetTagCategoryResult {
//   getTagCategory: {
//     tagCategory: Partial<TagCategory> | null
//   }
// }
