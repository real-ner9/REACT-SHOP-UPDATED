export type Slide = {
  id: number;
  link?: string;
  img_id: number;
}

export type GetSlides = () => Promise<Slide[]>

export type CreateSlidePayload = {
  link?: string;
  img_id: number
}

export type CreateSlideResponse = {
  slide: Slide
  message?: string
}

export type CreateSlide = (payload: CreateSlidePayload) => Promise<CreateSlideResponse>

export type EditSlidePayload = Partial<CreateSlidePayload>

export type EditSlideResponse = {
  slide: Slide
  message?: string
}

export type EditSlide = (id: number, payload: EditSlidePayload) => Promise<EditSlideResponse>

export type DeleteSlideResponse = {
  message?: string
}

export type DeleteSlide = (id: number) => Promise<DeleteSlideResponse>

export type SliderContextProps = {
  slides: Slide[]
  getSlides: GetSlides
  createSlide: CreateSlide
  editSlide: EditSlide
  deleteSlide: DeleteSlide
}
