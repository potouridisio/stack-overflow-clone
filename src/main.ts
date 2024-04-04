import {
  createQuestionElement,
  fetchQuestions,
  fetchTags,
  type Tag,
} from '../utils'

const [questions, tagsResponse] = await Promise.all([
  fetchQuestions(),
  fetchTags(),
])

const questionsContainer = document.querySelector('.space-y-4') as Element

questions.forEach((question) => {
  const questionElement = createQuestionElement(question)

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
