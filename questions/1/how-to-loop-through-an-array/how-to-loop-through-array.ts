import {
  createQuestionElement,
  fetchQuestions,
  fetchTags,
  Answers,
  fetchAnswers,
  fetchUsers,
  Question,
  User
} from '../../../utils';

import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)

const questionsContainer = document.querySelector('.space-y-4');

// Fetch data in parallel
const [answers, questions, { tags }, users] = await Promise.all([
  fetchAnswers(),
  fetchQuestions(),
  fetchTags(),
  fetchUsers(),
]);

// Log fetched data for verification
console.log('Fetched Questions:', questions);
console.log('Fetched Tags:', tags);
console.log('Fetched Users:', users);

// Function to fetch and display a specific question
async function displaySpecificQuestion() {
  // ID of the question to fetch
  const questionId = 1;
  
  // Find the question with the specified ID
  const q = questions.find(q => q.id === questionId);
  console.log('Question with ID 1:', q);

  if (q) {
      // Filter the tags associated with the question
      const questionTags = tags.filter(tag => q.tagIds.includes(tag.id));
      console.log('Tags for question ID 1:', questionTags);

      // Find the user associated with the question
      const user = users.find(u => u.id === q.userId);
      console.log('User for question ID 1:', user);
      
      // Create the question element
      const questionElement = createQuestionElement(q, questionTags, user);
      console.log('Created Question Element:', questionElement);
      
    
      
      // Append the question element to the container
      questionsContainer.appendChild(questionElement);
      const currentAnswers = answers.filter((answer) => answer.questionId === q.id) as Answers[];
      
      for (let i = 0; i < currentAnswers.length; i++) {

        const whoAnswered = users.find((user) => user.id === currentAnswers[i].userId) as User
        console.log(whoAnswered)
        document.getElementById("reputation").innerHTML = whoAnswered.reputation;
        document.getElementById("name").innerHTML = whoAnswered.name;
        document.getElementById("answer").innerHTML = currentAnswers[i].body;
        const currentTime = currentAnswers[i].updatedAt;
        const specificTime = dayjs(currentTime);
        document.getElementById("long-ago").innerHTML = specificTime.fromNow();

      }    
    
  } else {
      console.error(`No question found with ID ${questionId}`);
  }
}

// Call the function to display the specific question
displaySpecificQuestion();
 



 