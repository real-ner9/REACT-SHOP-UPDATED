export type BaseFilter = {
  id: number
  name: string
}

export type BaseFilterPayload = {
  name: string
}

export type BaseGetFilters<T extends BaseFilter = BaseFilter> = () => Promise<T[]>

export type BaseGetFilter<T extends BaseFilter = BaseFilter> = (id: number) => Promise<T>

export type BaseDeleteFilterResponse = {
  message?: string
}

export type BaseDeleteFilter = (id: number) => Promise<BaseDeleteFilterResponse>
