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

function toKebabCase(inputString: string): string {
  // Step 1: Truncate the string if it is over 80 characters long
  if (inputString.length > 80) {
      inputString = inputString.slice(0, 80);
  }

  // Step 2: Remove special characters and keep only lowercase a-z and 0-9
  // Use regex to remove all characters that are not lowercase a-z or 0-9
  const cleanedString = inputString.toLowerCase().replace(/[^a-z0-9\s]/g, '');

  // Step 3: Convert the cleaned string to kebab case
  // Replace spaces with hyphens
  const kebabCaseString = cleanedString.replace(/\s+/g, '-');

  return kebabCaseString;
}

// Example usage
const inputString = 'How to loop through an array in JavaScript?';
const result = toKebabCase(inputString);
console.log(result);  // Output: 'how-to-loop-through-an-array-in-javascript'


// Call the function to display the specific question
displaySpecificQuestion();