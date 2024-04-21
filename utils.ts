import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export interface Question {
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

export interface Answers {
  body: string
  createdAt: string
  id: number
  questionId: number
  updatedAt: string
  userId: number
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


export async function fetchAnswers(): Promise<any> {
  const response = await fetch('/api/questions/1/answers')

  return await response.json()
}


function toKebabCase(inputString: string): string {
  // Step 1: Truncate the string if it is over 80 characters long
  if (inputString.length > 80) {
      inputString = inputString.slice(0, 80);
  }

  // Step 2: Remove special characters and keep only lowercase a-z and 0-9
  // Use regex to remove all characters that are not lowercase a-z or 0-9
  const cleanedString = inputString.toLowerCase().replace(/[^a-z0-9\s]/g, '');

  // Step 3: Convert the cleaned string to kebab case
  // Replace spaces with hyphens
  const kebabCaseString = cleanedString.replace(/\s+/g, '-');

  return kebabCaseString;
}


export function createQuestionElement(
  question: Question,
  tags: Tag[],
  user: User,
  options?: { hideQuestionBody?: boolean }
) {
  const questionElement = document.createElement('div')

  questionElement.className = 'flex'
  questionElement.innerHTML = `
    <div class="w-24 flex-none p-2 pr-0">
      <ul class="flex flex-col py-2">
        <li class="flex items-center text-right">
          <div class="my-1 min-w-0 grow">
            <!--<p class="text-sm text-black/60">${question.voteCount} vote${question.voteCount !== 1 ? 's' : ''}</p>-->
          </div>
        </li>
        <li class="flex items-center text-right">
          <div class="my-1 min-w-0 grow">
            <!--<p class="text-sm text-black/60">${question.answerCount} answer${question.answerCount !== 1 ? 's' : ''}</p>-->
          </div>
        </li>
      </ul>
    </div>
    <div class="grow p-4">
      <div class="mb-1.5 text-2xl">
        <a href="/questions/${question.id}/${toKebabCase(question.title)}" class="text-sky-500">
+          ${question.title}
+        </a>
      </div>
      <p class="mb-1.5 line-clamp-2${options && options.hideQuestionBody ? ' hidden' : ''} text-sm">
        ${question.body}
      </p>
      <div class="flex justify-between">
        <div class="flex space-x-2"></div>
        <p class="text-sm text-black/60">${user.name} ${user.reputation} asked ${dayjs().to(dayjs(question.createdAt))}</p>
      </div>
    </div>
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

