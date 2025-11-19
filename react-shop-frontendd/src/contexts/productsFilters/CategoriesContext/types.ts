import type { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter, BaseGetFilters } from '../types';
export type Category = BaseFilter & {
  img_id: number
}

export type CreateCategoryPayload = BaseFilterPayload & {
  img_id: number
}

export type EditCategoryPayload = Partial<CreateCategoryPayload>

export type CreateCategoryResponse = {
  category: Category
  message?: string
}

export type CreateCategory = (payload: CreateCategoryPayload) => Promise<CreateCategoryResponse>

export type EditCategoryResponse = {
  category: Category
  message?: string
}

export type EditCategory = (id: number, payload: EditCategoryPayload) => Promise<EditCategoryResponse>

export type CategoriesContextProps = {
  getCategories: BaseGetFilters
  createCategory: CreateCategory
  editCategory: EditCategory
  deleteCategory: BaseDeleteFilter
  getCategory: BaseGetFilter
  categories: Category[]
  loading: boolean
}
