import {
  createQuestionElement,
  fetchQuestions,
  fetchTags,
  fetchUsers,
  Question,
  type User,
} from '../../../utils';

const questionsContainer = document.querySelector('.space-y-4');

// Fetch data in parallel
const [questions, { tags }, users] = await Promise.all([
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
  const question = questions.find(q => q.id === questionId);
  console.log('Question with ID 1:', question);

  if (question) {
      // Filter the tags associated with the question
      const questionTags = tags.filter(tag => question.tagIds.includes(tag.id));
      console.log('Tags for question ID 1:', questionTags);

      // Find the user associated with the question
      const user = users.find(u => u.id === question.userId);
      console.log('User for question ID 1:', user);
      
      // Create the question element
      const questionElement = createQuestionElement(question, questionTags, user);
      console.log('Created Question Element:', questionElement);
      
      // Append the question element to the container
      questionsContainer.appendChild(questionElement);
  } else {
      console.error(`No question found with ID ${questionId}`);
  }
}

// Call the function to display the specific question
displaySpecificQuestion();
