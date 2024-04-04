import { createQuestionElement, fetchQuestions, fetchTags } from '../utils'

const [questions, { tags }] = await Promise.all([fetchQuestions(), fetchTags()])

const questionsContainer = document.querySelector('.space-y-4') as Element

questions.forEach((question) => {
  const questionElement = createQuestionElement(question, tags)

  questionsContainer.appendChild(questionElement)
})
