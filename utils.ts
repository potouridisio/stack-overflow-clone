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
  const response = await fetch('/api/questions')

  return await response.json()
}

export async function fetchTags(): Promise<TagsResponse> {
  const response = await fetch('/api/tags')

  return await response.json()
}

export function createQuestionElement(question: Question) {
  const questionElement = document.createElement('div')

  questionElement.className = 'flex rounded bg-white text-black/90 shadow-md'
  questionElement.innerHTML = `
    <div class="w-24 flex-none p-2 pr-0">
      <ul class="flex flex-col py-2">
        <li class="flex items-center text-right">
          <div class="my-1 min-w-0 grow">
            <p class="text-sm text-black/60">${question.voteCount} votes</p>
          </div>
        </li>
        <li class="flex items-center text-right">
          <div class="my-1 min-w-0 grow">
            <p class="text-sm text-black/60">${question.answerCount} answer</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="grow p-4">
      <div class="mb-1.5 text-2xl">
        ${question.title}
      </div>
      <p class="mb-1.5 line-clamp-2 text-sm">
        ${question.body}
      </p>
      <div class="flex space-x-2"></div>
    </div>
  `

  return questionElement
}
