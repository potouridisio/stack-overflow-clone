import { fetchQuestions, fetchTags, type Tag } from '../utils'

const [questions, tagsResponse] = await Promise.all([
  fetchQuestions(),
  fetchTags(),
])

const questionsContainer = document.querySelector('.space-y-4') as Element

questions.forEach((question) => {
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
  questionsContainer.appendChild(questionElement)

  const tagsContainer = questionElement.querySelector(
    '.flex.space-x-2'
  ) as Element

  question.tagIds.forEach((tagId) => {
    const tag = tagsResponse.tags.find((tag) => tag.id === tagId) as Tag
    const tagElement = document.createElement('div')
    tagElement.className =
      'inline-flex h-6 cursor-pointer items-center rounded-2xl bg-sky-500 text-xs text-white hover:bg-sky-700'
    tagElement.innerHTML = `<span class="px-2">${tag.name}</span>`
    tagsContainer.appendChild(tagElement)
  })
})

export {}
