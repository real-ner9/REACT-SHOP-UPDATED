import type { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter } from '../types';
export type Color = BaseFilter & {
  category_ids: number[]
  value: string
}

export type GetColorsFilter = {
  category_id?: string | number | null
}

export type GetColors = (filter?: GetColorsFilter) => Promise<Color[]>

export type CreateColorPayload = BaseFilterPayload & {
  category_ids: number[]
  value: string
}

export type EditColorPayload = Partial<CreateColorPayload>

export type CreateColorResponse = {
  color: Color
  message?: string
}

export type CreateColor = (payload: CreateColorPayload) => Promise<CreateColorResponse>

export type EditColorResponse = {
  color: Color
  message?: string
}

export type EditColor = (id: number, payload: EditColorPayload) => Promise<EditColorResponse>

export type ColorsContextProps = {
  getColors: GetColors
  createColor: CreateColor
  editColor: EditColor
  deleteColor: BaseDeleteFilter
  getColor: BaseGetFilter
}
