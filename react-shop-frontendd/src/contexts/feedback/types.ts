export type SendFeedbackPayload = {
  phone: string
  name: string
  comment?: string
}

export type SendFeedbackResponse = {
  message?: string
}

export type SendFeedback = (payload: SendFeedbackPayload) => Promise<SendFeedbackResponse>

export type FeedbackContextProps = {
  sendFeedback: SendFeedback
}
