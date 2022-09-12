const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionsBlockEl = document.getElementById('answerBtn');
const questionsEl = document.getElementById('question');
const questionContainerEl = document.getElementById('questContainer');
const answerBtnEl = document.getElementById('answerBtn');
const scoreEl = document.getElementById('scoreEl');
const scoreSpan = document.getElementById('score');
const scoreBtnEl = document.getElementById('scoreBtn');
const welcomeScreenEl = document.getElementById('welcomeScreen');
const questionsScreenEl = document.getElementById('questionsScreen');
const playerScoreScreenEl = document.getElementById('playerScoreScreen');
const highScoreScreenEl = document.getElementById('highScoreScreen');
const submitBtnEl = document.getElementById('submitBtn');
const timeLeftEl = document.getElementById('timeLeft');
const userScoreEl = document.getElementById('userScore');

let score = 0;
scoreSpan.innerText = score;

let sec = 60;
let time = setInterval(myTimer, 1000);

let currentQuestionsIndex;

startBtn.addEventListener('click', startGame, myTimer);
nextBtn.addEventListener('click', () => {
  currentQuestionsIndex++;
  setNextQuestion();
})

function startGame() {
  welcomeScreenEl.classList.add('hide');
  questionsScreenEl.classList.remove('hide');
  currentQuestionsIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  questionsBlockEl.innerHTML = "";
  questionContainerEl.classList.remove('hide');
  questionsEl.classList.remove('hide');
  answerBtnEl.classList.remove('hide');
  nextBtn.classList.remove('hide');
  scoreEl.classList.remove('hide')
  showQuestion(questionsArray[currentQuestionsIndex]);
}

function showQuestion(question) {
  questionsEl.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    questionsBlockEl.appendChild(button)
    button.addEventListener('click', selectAnswer);
  })
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const answer = selectedBtn.getAttribute('data-correct');
  Array.from(answerBtnEl.children).forEach(btn => {
    setStatusClass(btn, btn.dataset.correct);
  })
  if(answer === "true") {
    score ++;
    scoreSpan.innerText = score;
  }
  if (questionsArray.length > currentQuestionsIndex + 1) {
  nextBtn.classList.remove('hide');
  } else {
  nextBtn.classList.add('hide');
  scoreBtn.classList.remove('hide');
  scoreBtn.innerText = 'Record Score';
  startBtn.classList.add('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function myTimer() {
  timeLeftEl.innerHTML = sec + " sec";
  sec--;
  if (sec == -1) {
      clearInterval(time);
      alert("Time's Up!! Record your score");
  }
}

scoreBtnEl.addEventListener('click', recordScore);

function recordScore() {
  questionsScreenEl.classList.add('hide');
  playerScoreScreenEl.classList.remove('hide');
}
 
let nameInput = document.getElementById('name');
let userScoreInput = document.getElementById;('score');

submitBtnEl.addEventListener('click', function(event) {
  event.preventDefault();
  var list = {
    name: nameInput.value,
    score: userScoreInput.value
  };
  console.log(list);
  localStorage.setItem("list", JSON.stringify(list));
  // viewHighScores();  
});

function viewHighScores() {
  playerScoreScreenEl.classList.add('hide');
  highScoreScreenEl.classList.remove('hide');
}

var questionsArray = [
   {
     question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
     answers: [
       {text: 'JavaScript', correct: false},
       {text: 'terminal/bash', correct: false},
       {text: 'for loops', correct: false},
       {text: 'console.log', correct: true}
     ]
   },

   {
     question: 'String values must be enclused withing _____ when being assigned to variables.',
     answers: [
       {text: 'commas', correct: false},
       {text: 'curly brackets', correct: false},
       {text: 'quores', correct: true},
       {text: 'parenthesis', correct: false}
     ]
   },

   {
     question: 'Commonly used data types DO NOT include:',
     answers: [
       {text: 'Strings', correct: false},
       {text: 'Booleans', correct: false},
       {text: 'Alerts', correct: true},
       {text: 'Numbers', correct: false}
     ]
   },

   {
     question: 'The condition in an if/else statement is enclosed with ______.',
     answers: [
       {text: 'quotes', correct: false},
       {text: 'curly brackets', correct: false},
       {text: 'parenthesis', correct: true},
       {text: 'square brackets', correct: false}
     ]  
   },

   {
     question: 'Arrays in JavaScript can be used to store ______',
     answers: [
       {text: 'numbers and stringss', correct: false},
       {text: 'other arrays', correct: false},
       {text: 'booleans', correct: false},
       {text: 'all of the above', correct: true}
     ]
   }
]
