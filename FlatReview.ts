export interface FlatReview {
  author: string
  content: string
  date: Date | undefined
  rating: number | undefined
  title: string
  version: string | undefined
  voteCount: number | undefined
  voteSum: number | undefined
}