interface Question {
  answerCount: number
  body: string
  createdAt: string
  id: number
  tagIds: number[]
  title: string
  updatedAt: string
  userId: number
  voteCount: number
}

export interface Tag {
  createdAt: string
  description: string
  id: number
  name: string
  occurrenceCount: number
}

interface TagsResponse {
  currentPage: number
  pageSize: number
  tags: Tag[]
  totalCount: number
  totalPages: number
}

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch('http://localhost:3000/questions')
  return await response.json()
}

export async function fetchTags(): Promise<TagsResponse> {
  const response = await fetch('http://localhost:3000/tags')
  return await response.json()
}
