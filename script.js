window.addEventListener('scroll', () => {
    const navbar = document.querySelector('#navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
});
const exploreButton = document.getElementById('explore');

    // Add a click event listener to the button
    exploreButton.addEventListener('click', () => {
        // Redirect to the desired page
        window.location.href = 'daftar/daftar.html';
});
const loginButton = document.getElementById('login');

    // Add a click event listener to the button
    loginButton.addEventListener('click', () => {
        // Redirect to the desired page
        window.location.href = 'daftar/daftar.html';
});
const startQuizBtn = document.getElementById('startQuizBtn');
const userInput = document.getElementById('user');
startQuizBtn.addEventListener('click', () => {
    console.log('Button clicked');
    console.log('User Input Value:', userInput.value);

    // Retrieve the existing usernames from localStorage
    let storedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];

    // Check if the username is not already in the array before adding it
    if (userInput.value.trim() === '') {
      alert("ISI NAMA LU !!!!!");
      console.log('Username is empty. Please enter a valid username.');
    } else {
      if (!storedUsernames.includes(userInput.value)) {
        storedUsernames.push(userInput.value);
        localStorage.setItem('user', userInput.value)
        localStorage.setItem('usernames', JSON.stringify(storedUsernames));
        // Redirect to the quiz page
        window.location.href = 'kuis/index.html';
      } else {
        alert("You've done the quiz")
        console.log('Username already exists. Choose a different username.');
        // Add your code to display an error message or take other actions 
      }
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const rankingList = document.getElementById('ranking-list');
  
  // Get the array of users from localStorage
  const users = JSON.parse(localStorage.getItem('usernames')) || [];
  
  // Create an array of user objects with placeholder data
  const userObjects = users.map(username => {
      return {
          name: username,
          duration: localStorage.getItem(`quizDuration_${username}`),  // Placeholder duration
          score: localStorage.getItem(`score_${username}`)// Placeholder score
      };
  });

  // Sort the users based on score (descending) and duration (ascending)
  const sortedUsers = sortUsers(userObjects);

  // Display sorted users in the ranking list
  sortedUsers.forEach((user, index) => {
      const rankItem = document.createElement('div');
      rankItem.classList.add('rank-item');

      const rank = document.createElement('div');
      rank.classList.add('rank');
      rank.textContent = index + 1;  // Rank based on array index

      const userName = document.createElement('div');
      userName.classList.add('user');
      userName.textContent = user.name;

      const score = document.createElement('div');
      score.classList.add('score');
      score.textContent = user.score;

      const userDuration = document.createElement('div');
      userDuration.classList.add('duration');
      userDuration.textContent = user.duration+" s";

      rankItem.appendChild(rank);
      rankItem.appendChild(userName);
      rankItem.appendChild(userDuration);
      rankItem.appendChild(score);

      rankingList.appendChild(rankItem);
  });

  console.log('Sorted User Data:', sortedUsers);
});

// Function to sort users based on score (descending) and duration (ascending)
function sortUsers(users) {
  return users.sort((a, b) => {
      // Sort by score in descending order
      if (b.score !== a.score) {
          return b.score - a.score;
      }
      // If scores are equal, sort by duration in ascending order
      const [aMinutes, aSeconds] = a.duration.split(':').map(Number);
      const [bMinutes, bSeconds] = b.duration.split(':').map(Number);
      const aTotalSeconds = aMinutes * 60 + aSeconds;
      const bTotalSeconds = bMinutes * 60 + bSeconds;
      return aTotalSeconds - bTotalSeconds;
  });
}
