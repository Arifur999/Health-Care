export interface INews {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string[]
  coverImage?: string | null
  author: string
  category: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface INewsPayload {
  title: string
  slug?: string
  excerpt: string
  content: string[]
  coverImage?: string
  author?: string
  category?: string
  isPublished?: boolean
}
