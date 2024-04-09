import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

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

export interface User {
  id: number
  location: string
  name: string
  reputation: number
  tagIds: number[]
}

interface Answers {
  body: string
  createdAt: string
  id: number
  questionId: number
  updatedAt: string
  userId: number
}

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch('/api/questions')

  return await response.json()
}

export async function fetchTags(page?: number): Promise<TagsResponse> {
  const response = await fetch(`/api/tags${page ? `?page=${page}` : ''}`)

  return await response.json()
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users')

  return await response.json()
}

export async function fetchAnswers(id: number): Promise<Answers[]> {
  const response = await fetch(`/api/questions/${id}/answers`)

  return await response.json()
}

export async function fetchCurrQuestion(id: number): Promise<Question> {
  const response = await fetch(`/api/questions/${id}`)

  return await response.json()
}

export function createQuestionElement(
  question: Question,
  tags: Tag[],
  user: User,
  options?: { hideQuestionBody?: boolean }
) {
  const questionElement = document.createElement('div')

  questionElement.className = 'flex rounded bg-white text-black/90 shadow-md'
  questionElement.innerHTML = `
    <div class="w-24 flex-none p-2 pr-0">
      <ul class="flex flex-col py-2">
        <li class="flex items-center text-right">
          <div class="my-1 min-w-0 grow">
            <p class="text-sm text-black/60">${question.voteCount} vote${question.voteCount !== 1 ? 's' : ''}</p>
          </div>
        </li>
        <li class="flex items-center text-right">
          <div class="my-1 min-w-0 grow">
            <p class="text-sm text-black/60">${question.answerCount} answer${question.answerCount !== 1 ? 's' : ''}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="grow p-4">
      <a id=${question.id} href="" class="mb-1.5 text-2xl">
        ${question.title}
      </a>
      <p class="mb-1.5 line-clamp-2${options && options.hideQuestionBody ? ' hidden' : ''} text-sm">
        ${question.body}
      </p>
      <div class="flex justify-between">
        <div class="flex space-x-2"></div>
        <p class="text-sm text-black/60">${user.name} ${user.reputation} asked ${dayjs().to(dayjs(question.createdAt))}</p>
      </div>
    </div>
    <div class="grow text-4xl text-neutral-800"></div>
  `

  const tagsContainer = questionElement.querySelector(
    '.flex.space-x-2'
  ) as Element

  tags.forEach((tag) => {
    const tagElement = document.createElement('div')

    tagElement.className =
      'inline-flex h-6 cursor-pointer items-center rounded bg-sky-500/10 text-xs text-sky-500 hover:bg-sky-500/15'
    tagElement.innerHTML = `<span class="px-2">${tag.name}</span>`

    tagsContainer.appendChild(tagElement)
  })

  return questionElement
}

export function createCurrQuestion(currQuestion: Question, answer: any) {
  const questionContainer = document.querySelector('main') as Element
  console.log(parseInt(window.location.pathname.split('/').filter(Boolean)[1]))

  questionContainer.innerHTML = `<div class="min-h-16"></div>
  <div class="mb-4 flex items-start">
  <div class="grow text-4xl text-neutral-800">${currQuestion.title}</div>
    <a
       class="inline-flex min-w-16 items-center justify-center rounded bg-sky-500 px-4 py-1.5 text-center text-sm font-medium uppercase leading-6 text-white shadow-md outline-0 hover:bg-sky-700 hover:shadow-lg"
      href="/questions/ask/"
      >Ask Question
    </a>
  </div>
   <div class="space-y-4 text-gray-400">Asked ${dayjs(currQuestion.createdAt.slice(0, 10)).fromNow()}</div>
   <hr class="my-5" />
   <div>
   ${currQuestion.body}
   </div>
     <div class="flex space-x-2"></div>
     <div class="flex justify-end"></div>
    <div class="grow text-4xl text-neutral-800 my-2">${answer.length} Answer${answer.length !== 1 ? 's' : ''}</div>
    <div class="py-1"></div>
    <hr class="my-5" />
    <div class="grow text-4xl text-neutral-800">Your Answer</div>
    `
}

export function titleStringer(currQuestion: Question) {
  let truncation =
    currQuestion.title.length > 80
      ? currQuestion.title.substring(0, 80)
      : currQuestion.title
  let specialDeletion = truncation.replace(/[^a-zA-Z ]/g, '').toLowerCase()
  let kebabization = specialDeletion.replace(/\s+/g, '-')

  return kebabization
}
