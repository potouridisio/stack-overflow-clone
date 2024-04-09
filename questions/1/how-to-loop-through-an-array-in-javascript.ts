import dayjs from 'dayjs'
import {
  fetchTags,
  fetchUsers,
  fetchAnswers,
  fetchCurrQuestion,
  createCurrQuestion,
  titleStringer,
  type User,
} from '../../utils'

const id = parseInt(window.location.pathname.split('/').filter(Boolean)[1])
const [currQuestion, { tags }, users, answers] = await Promise.all([
  fetchCurrQuestion(id),
  fetchTags(),
  fetchUsers(),
  fetchAnswers(id),
])

titleStringer(currQuestion)
createCurrQuestion(currQuestion, answers)

//Post Tag
const currQTags = tags.filter((tag) => currQuestion.tagIds.includes(tag.id))
currQTags.forEach((tag) => {
  const tagsContainer = document.querySelector('.flex.space-x-2') as Element
  const tagElement = document.createElement('div')

  tagElement.className =
    'inline-flex h-6 my-2 cursor-pointer items-center rounded bg-sky-500/10 text-xs text-sky-500 hover:bg-sky-500/15'
  tagElement.innerHTML = `<span class="px-2">${tag.name}</span>`

  tagsContainer.appendChild(tagElement)
})

//Post User//
const postUserContainer = document.querySelector(
  '.flex .justify-end'
) as Element
const currUser = users.find((user) => user.id === currQuestion.userId) as User
const postUserElement = document.createElement('div')
postUserElement.className = 'bg-sky-500/10 rounded basis-60 px-2 pr-20'
postUserElement.innerHTML = `
<p class="text-sm my-2 text-gray-400">asked ${dayjs(currQuestion.createdAt.slice(0, 10)).fromNow()}</p>
<p class="text-sm my-2">${currUser?.name}</p>
<p class="text-sm my-2">${currUser?.reputation}</p>`

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
