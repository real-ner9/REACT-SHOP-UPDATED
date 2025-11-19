export type GetProductsResponse = {
  data: Product[]
  links: ProductsLinks
  meta: ProductsMeta
}

export type Product = {
  id: number
  name: string
  price: number
  count: number
  brand_id: number
  category_id: number
  color_id?: number;
  amount_id?: number;
  quantity_id?: number;
  img_ids: number[]
  created_at: string
  description?: string
}

export type ProductsMeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: string | null;
  searchBy: string | null;
  search: string;
  filter?: ProductsFilter;
}

export type ProductsLinks = {
  first?: string;
  previous?: string;
  current: string;
  next?: string;
  last?: string;
}

export type ProductsParams = {
  limit?: string | null
  page?: string | null
  sortBy?: string | null | number
  route?: string
}

export type ProductsFilter = {
  category_id?: string | null
  brand_id?: string | null
  price_min?: string | null
  price_max?: string | null
  search?: string | null
  color?: number[] | null
  amount?: number[] | null
}

export type GetProducts = (params?: ProductsParams, filter?: ProductsFilter) => Promise<GetProductsResponse>

export type GetProductsWithSearch = (search: string) => Promise<Product[]>

export type GetProduct = (id: number) => Promise<Product>

export type CreateProductPayload = {
  name: string
  price: number
  count: number
  category_id: number
  img_ids?: number[]
  description?: string
}

export type CreateProductResponse = {
  id: number
  message?: string
}

export type CreateProduct = (payload: CreateProductPayload) => Promise<CreateProductResponse>

export type EditProductPayload = Partial<CreateProductPayload> & {
  brand_id?: number
  color_id?: number | null
  amount_id?: number | null
}

export type EditProductResponse = {
  id: number
  message?: string
}

export type EditProduct = (id: number, payload: EditProductPayload) => Promise<EditProductResponse>

export type DeleteProductResponse = {
  message?: string
}

export type DeleteProduct = (id: number) => Promise<DeleteProductResponse>

export type GetPriceRangeFilter = {
  category_id?: string | number | null
  search?: string | null
}

export type GetPriceRange = (filter: GetPriceRangeFilter) => Promise<PriceRange>

export type PriceRange = { min: number, max: number }

export type ProductsContextProps = {
  getProducts: GetProducts
  getProduct: GetProduct
  createProduct: CreateProduct
  editProduct: EditProduct
  deleteProduct: DeleteProduct
  getPriceRange: GetPriceRange
  getProductsWithSearch: GetProductsWithSearch
}
