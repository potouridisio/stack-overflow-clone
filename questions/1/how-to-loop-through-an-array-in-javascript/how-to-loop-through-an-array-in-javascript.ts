import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {
  createQuestionElement,
  fetchQuestions,
  fetchTags,
  fetchUsers,
  type User,
  type Tag,
  type Question,
  fetchAnswers,
  type Answer,
  fetchQuestionsId

} from '../../../utils'



//const answers:any=fetchAnswers()
//console.log(answers)


//console.log(window.location.pathname.split('/'))
//const currentQuestId = parseInt(window.location.pathname.split('/')[2])


const [questions, { tags }, users, answers, questionId] = await Promise.all([
  fetchQuestions(),
  fetchTags(),
  fetchUsers(),
  fetchAnswers(),
  fetchQuestionsId()
])
const currentQuestId = questionId.id
const curentQuest = questions.find((question) => question.id === currentQuestId) as Question
console.log(curentQuest?.title)
console.log('when?' + curentQuest?.createdAt)
const userWhoAsked = users.find((user) => user.id === curentQuest?.userId) as User

console.log(userWhoAsked.name)
const currentAnswers = answers.filter((answer) => answer.questionId === currentQuestId) as Answer[]
// αυτο πρεπει να γινει για καθε απαντηση , να βρεθει δηλαδη ο user της εκάστοτε απάντησης για 
// να μην βγαινει undefined


for (let i = 0; i < currentAnswers.length; i++) {
  const whoAnswered = users.find((user) => user.id === currentAnswers[i].userId) as User
  console.log(currentAnswers[i].body)
  console.log(whoAnswered.name)
}


let tagNames: string[] = []


const currentQuestionTags = tags.filter((tag) => curentQuest.tagIds.includes(tag.id)) as Tag[]
//for each currentquest.tagIds
// console.log(currentQuestionTags)
for (let i = 0; i < currentQuestionTags.length; i++) {
  //  console.log(currentQuestionTags[i].name)
  tagNames.push(currentQuestionTags[i].name)

}
console.log(tagNames)


const qContainer = document.getElementById("questionElementContainer") as HTMLElement
const questEelement = document.createElement('div')
questEelement.className = "grow text-4xl text-neutral-800"
questEelement.innerHTML = `${curentQuest.title} `
const qAskedAgo = document.createElement('div')
qAskedAgo.className = "grow text-sm font-normal"
qAskedAgo.innerHTML = `Asked ${dayjs().to(dayjs(curentQuest.createdAt))}`
qContainer.appendChild(questEelement)
qContainer.appendChild(qAskedAgo)

const qBodyText = document.getElementById('qBodyText') as HTMLElement
const qbtext = document.createElement('div')
qbtext.className = 'text-sm font-normal'
qbtext.innerHTML = `${curentQuest.body} `
qBodyText.appendChild(qbtext)

const tagsContainer = document.getElementById('tagsContainer') as HTMLElement
for (let i = 0; i < tagNames.length; i++) {
  const tag = document.createElement('div')
  tag.className = "inline-flex h-6 cursor-pointer items-center rounded bg-sky-500/10 text-xs text-sky-500 hover:bg-sky-500/15"
  tag.innerHTML = ` <span class="px-2">${tagNames[i]} </span> `
  tagsContainer?.appendChild(tag)
}

const userWhoAskedContainer = document.getElementById('userAsk') as HTMLElement
const userasked = document.createElement('div')
userasked.className = "ml-auto text-left flex flex-col bg-sky-500/[0.1]  rounded w-48"
userasked.innerHTML = `
 <p class="text-xs text-black/60 py-1">Asked ${dayjs().to(dayjs(curentQuest.createdAt))}</p>
<p class="text-xs text-black/90">${userWhoAsked.name}</p>
<p class="text-xs text-black/90 py-1">${userWhoAsked.reputation}</p>`
userWhoAskedContainer.appendChild(userasked)

const ansContainer=document.getElementById('answersContainer') as HTMLElement
ansContainer.innerHTML= `${curentQuest.answerCount} Answer${curentQuest.answerCount !== 1 ? 's' : ''}`


const answerbodyCont=document.getElementById('answerBodyContainer') as HTMLElement
for (let i = 0; i < currentAnswers.length; i++){
  const whoAnswered = users.find((user) => user.id === currentAnswers[i].userId) as User
const textAnswer=document.createElement('p')
textAnswer.className="text-sm text-black/90"
textAnswer.innerHTML=`${currentAnswers[i].body}`
const divUsersResponded=document.createElement('div')
divUsersResponded.className="ml-auto text-left flex flex-col   rounded w-48 mt-7 pb-8"
divUsersResponded.innerHTML=`  <p class="text-xs text-black/60 py-1">answered ${dayjs().to(dayjs(currentAnswers[i].createdAt))} </p>
<p class="text-xs text-black/90">${whoAnswered.name}</p>
<p class="text-xs text-black/90 py-1">${whoAnswered.reputation}</p>`
answerbodyCont.appendChild(textAnswer)
answerbodyCont.appendChild(divUsersResponded)
}