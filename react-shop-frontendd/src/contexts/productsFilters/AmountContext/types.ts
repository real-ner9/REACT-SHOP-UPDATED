import type { BaseDeleteFilter, BaseFilter, BaseFilterPayload, BaseGetFilter } from '../types';
export type Amount = BaseFilter & {
  category_ids: number[]
}

export type GetAmountsFilter = {
  category_id?: string | number | null
}

export type GetAmounts = (filter?: GetAmountsFilter) => Promise<Amount[]>

export type CreateAmountPayload = BaseFilterPayload & {
  category_ids: number[]
}

export type EditAmountPayload = Partial<CreateAmountPayload>

export type CreateAmountResponse = {
  amount: Amount
  message?: string
}

export type CreateAmount = (payload: CreateAmountPayload) => Promise<CreateAmountResponse>

export type EditAmountResponse = {
  amount: Amount
  message?: string
}

export type EditAmount = (id: number, payload: EditAmountPayload) => Promise<EditAmountResponse>

export type AmountsContextProps = {
  getAmounts: GetAmounts
  createAmount: CreateAmount
  editAmount: EditAmount
  deleteAmount: BaseDeleteFilter
  getAmount: BaseGetFilter
}
