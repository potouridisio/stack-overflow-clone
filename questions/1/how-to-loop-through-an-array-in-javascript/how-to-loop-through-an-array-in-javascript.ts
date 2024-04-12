import {
  createQuestionElement,
  fetchQuestions,
  fetchTags,
  fetchUsers,
  type User,
  type Tag,
  type Question,
  fetchAnswers,
  type Answer

} from '../../../utils'



 //const answers:any=fetchAnswers()
 //console.log(answers)


console.log(window.location.pathname.split('/'))
const currentQuestId = parseInt(window.location.pathname.split('/')[2])


const [questions, { tags }, users,answers] = await Promise.all([
  fetchQuestions(),
  fetchTags(),
  fetchUsers(),
  fetchAnswers()
])

  const curentQuest = questions.find((question) => question.id===currentQuestId) as Question
  console.log(curentQuest?.title)
  console.log('when?' + curentQuest?.createdAt)
  const userWhoAsked = users.find((user) => user.id ===curentQuest?.userId) as User

  console.log(userWhoAsked.name )
  const currentAnswers=answers.filter((answer)=>answer.questionId===currentQuestId)as Answer
  // αυτο πρεπει να γινει για καθε απαντηση , να βρεθει δηλαδη ο user της εκάστοτε απάντησης για 
  // να μην βγαινει undefined
  console.log(currentAnswers[0].body)
  const whoAnswered=users.find((user)=>user.id===currentAnswers[0].userId) as User
  console.log( whoAnswered)

  
  let tagNames:string[]=[]
  
  
  const currentQuestionTags = tags.filter((tag) => curentQuest.tagIds.includes(tag.id)) as Tag[]
  //for each currentquest.tagIds
  console.log(currentQuestionTags)
  for (let i=0; i<currentQuestionTags.length; i++){
  //  console.log(currentQuestionTags[i].name)
    tagNames.push(currentQuestionTags[i].name)

  }
  console.log(tagNames)

