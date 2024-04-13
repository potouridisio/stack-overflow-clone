import dayjs from 'dayjs'
import {
  fetchTags,
  fetchUsers,
  fetchAnswers,
  fetchCurrQuestion,
  type User,
  createCurrQuestion,
  titleStringer,
} from '../../../utils'

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id') as string

const [currQuestion, { tags }, users, answers] = await Promise.all([
  fetchCurrQuestion(id),
  fetchTags(),
  fetchUsers(),
  fetchAnswers(id),
])

createCurrQuestion(currQuestion, tags, answers)
titleStringer(currQuestion, id)

const postUserContainer = document.querySelector(
  '.flex .justify-end'
) as Element
const currentUser = users.find(
  (user) => user.id === currQuestion.userId
) as User
const postUserElement = document.createElement('div')
postUserElement.className = 'bg-sky-500/10 rounded basis-60 px-2 pr-20'
postUserElement.innerHTML = `
<p class="text-sm my-2 text-gray-400">asked ${dayjs(currQuestion.createdAt.slice(0, 10)).fromNow()}</p>
<p class="text-sm my-2">${currentUser.name}</p>
<p class="text-sm my-2">${currentUser.reputation}</p>`
postUserContainer.appendChild(postUserElement)

//Answers//
const answerContainer = document.querySelector('.py-1') as Element
answers.forEach((answer) => {
  const answerElement = document.createElement('div')
  answerElement.textContent = answer.body
  answerContainer.appendChild(answerElement)

  const answerUser = users.find((user) => user.id === answer.userId) as User
  const answerUserContainer = document.createElement('div')
  answerUserContainer.className = 'my-4 flex justify-end'
  const answerUserInfo = document.createElement('div')
  answerUserInfo.className = 'p-2 basis-60 pr-10'
  answerUserInfo.innerHTML = `<p class="text-sm my-2 text-gray-400">answered ${dayjs(answer.createdAt.slice(0, 10)).fromNow()}</p>
    <p class="text-sm my-2">${answerUser.name}</p>
    <p class="text-sm my-2">${answerUser?.reputation}</p>`
  answerUserContainer.appendChild(answerUserInfo)
  answerContainer.appendChild(answerUserContainer)
})
// //Post Tag
