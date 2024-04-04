import {
  createQuestionElement,
  fetchQuestions,
  fetchTags,
  fetchUsers,
} from '../utils'

const [questions, { tags }, users] = await Promise.all([
  fetchQuestions(),
  fetchTags(),
  fetchUsers(),
])

const questionsContainer = document.querySelector('.space-y-4') as Element

questions.forEach((question) => {
  const questionElement = createQuestionElement(question, tags, users)

  questionsContainer.appendChild(questionElement)
})
