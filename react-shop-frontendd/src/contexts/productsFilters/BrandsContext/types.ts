import type { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter } from '../types';
export type Brand = BaseFilter & {
  category_ids: number[]
}

export type GetBrandsFilter = {
  category_id?: string | number | null
}

export type GetBrands = (filter?: GetBrandsFilter) => Promise<Brand[]>

export type CreateBrandPayload = BaseFilterPayload & {
  category_ids: number[]
}

export type EditBrandPayload = Partial<CreateBrandPayload>

export type CreateBrandResponse = {
  brand: Brand
  message?: string
}

export type CreateBrand = (payload: CreateBrandPayload) => Promise<CreateBrandResponse>

export type EditBrandResponse = {
  brand: Brand
  message?: string
}

export type EditBrand = (id: number, payload: EditBrandPayload) => Promise<EditBrandResponse>

export type BrandsContextProps = {
  getBrands: GetBrands
  createBrand: CreateBrand
  editBrand: EditBrand
  deleteBrand: BaseDeleteFilter
  getBrand: BaseGetFilter
}
