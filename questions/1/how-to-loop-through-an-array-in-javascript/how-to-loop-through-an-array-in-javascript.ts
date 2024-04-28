import {
  fetchAnswers,
  fetchQuestions,
  fetchTags,
  fetchUsers,
  type Question,
  type User,
} from '../../../utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const pathname = location.pathname
const qId = +(pathname.match(/\d+(?=\/)/) as RegExpMatchArray)
console.log(qId)

const [questions, { tags }, users] = await Promise.all([
  fetchQuestions(),
  fetchTags(),
  fetchUsers(),
])

const currentQuestion = questions.find(
  (question) => question.id === qId
) as Question
console.log(currentQuestion)

const currentQuestionTags = tags.filter((tag) =>
  currentQuestion.tagIds.includes(tag.id)
)
console.log(currentQuestionTags)

const currentQuestionUser = users.find(
  (user) => user.id === currentQuestion.userId
) as User
console.log(currentQuestionUser)

const currentQuestionAnswers = await fetchAnswers(qId)
console.log(currentQuestionAnswers)

const currentQuestionSection = document.createElement('section') as HTMLElement
currentQuestionSection.innerHTML = `
          <div class="mb-4 flex items-start">
            <div class="grow">
              <p class="text-4xl text-neutral-800">
                ${currentQuestion.title}
              </p>
              <p class="py-2 text-sm text-black/60">
              asked ${dayjs().to(dayjs(currentQuestion.createdAt))}
              </p>
            </div>
            <a
              class="inline-flex min-w-16 items-center justify-center rounded bg-sky-500 px-4 py-1.5 text-center text-sm font-medium uppercase leading-6 text-white shadow-md outline-0 hover:bg-sky-700 hover:shadow-lg"
              href="/questions/ask/"
              >Ask Question</a
            >
          </div>
          <hr />
          <div class="flex flex-col py-1 gap-2">
            <p class="text-sm leading-5">
              ${currentQuestion.body}
            <div class="flex space-x-2 mt-2" id="currentQuestionTagsContainer">              
            </div>
            <div class="text-xs text-left self-end">
              <div class="min-w-48 p-2 rounded flex flex-col gap-1 bg-sky-500/15">
                <p class="text-black/60">asked a year ago</p>
                <span>${currentQuestionUser.name}</span>
                <span>${currentQuestionUser.reputation}</span>
              </div>
            </div>
            <section class="flex flex-col py-1 gap-2" id="currentQuestionAnswersSection">
            <h3 class="text-2xl" id="currentQuestionAnswersNumber">${currentQuestion.answerCount} answer${currentQuestion.answerCount > 1 ? 's' : ''}</h3>
            <hr />
            <h3 class="text-2xl">Your Answer</h3>
          </div>
          </section>
          <div class="space-y-4"></div>
`

const currentQuestionTagsContainer = currentQuestionSection.querySelector(
  '#currentQuestionTagsContainer'
) as HTMLElement
currentQuestionTags.forEach((tag) => {
  const tagElement = document.createElement('div')

  tagElement.className =
    'inline-flex h-6 cursor-pointer items-center rounded bg-sky-500/10 text-xs text-sky-500 hover:bg-sky-500/15'
  tagElement.innerHTML = `<span class="px-2">${tag.name}</span>`

  currentQuestionTagsContainer.appendChild(tagElement)
})

const currentQuestionAnswersNumber = currentQuestionSection.querySelector('#currentQuestionAnswersNumber') as HTMLElement;

currentQuestionAnswers.forEach((answer) => {
    const answerUser = users.find((user) => user.id === answer.userId) as User;
    const answerArticle = document.createElement('article') as HTMLElement;
    answerArticle.className = 'flex flex-col'
    answerArticle.innerHTML = `
        <p class="text-sm leading-5">${answer.body}</p>
        <div class="text-xs text-left self-end">
            <div class="min-w-48 p-2 rounded flex flex-col gap-1">
                <p class="text-black/60">answered  ${dayjs().to(dayjs(answer.createdAt))}</p>
                <span>${answerUser.name}</span>
                <span>${answerUser.reputation}</span>
            </div>
        </div>
    `
    currentQuestionAnswersNumber.insertAdjacentElement("afterend", answerArticle);
})

const mainContainer = document.querySelector('main') as HTMLElement
mainContainer.appendChild(currentQuestionSection)
