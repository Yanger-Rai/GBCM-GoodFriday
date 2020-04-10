const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-questions2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

// questions and options ard answers

const questions = [
  {
    q: "Who is the current Pastor of GBCM?",
    options: [
      "Someone Ofcouse!",
      "The guys who stands on bulpet every sunday",
      "Joshua Gurung",
    ],
    answer: 2,
  },
  {
    q: "Who is the current Youth Pastor of GBCM?",
    options: [`It's that GUY`, "Uuto Manu tho", "Vijay Thapa"],
    answer: 2,
  },
  {
    q: `What is the current Pastorni's name?`,
    options: ["Lonail laaga Amma", "Amsha Rai", "Lonailla Rai"],
    answer: 1,
  },
  {
    q: `Selec the correct Verse:" How blessed are the people who are so situated; How blessed are the people whose God is the LORD!"`,
    options: ["Psalm 144:15", "John 8:54", "Psalm 33:12"],
    answer: 0,
  },
];

// set questions and options and question numbers
totalQuestionSpan.innerHTML = questions.length;
function load() {
  questionNumberSpan.innerHTML = index + 1;
  question.innerHTML = questions[questionIndex].q;
  op1.innerHTML = questions[questionIndex].options[0];
  op2.innerHTML = questions[questionIndex].options[1];
  op3.innerHTML = questions[questionIndex].options[2];
  index++;
}

function check(element) {
  if (element.id == questions[questionIndex].answer) {
    element.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    element.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
}

function disabledOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add("disabled");
    if (options[i].id == questions[questionIndex].answer) {
      options[i].classList.add("correct");
    }
  }
}

function enableOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("disabled", "correct", "wrong");
  }
}

function validate() {
  if (!options[0].classList.contains("disabled")) {
    alert(" Answer all questions. Prove your Gorhakli-NESS!");
  } else {
    enableOptions();
    randomQuestion();
  }
}
function next() {
  validate();
}

function randomQuestion() {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = 0;
  if (index == questions.length && score != questions.length) {
    quizOver();
  } else if (index == questions.length && score == questions.length) {
    quizpass();
  } else {
    if (myArray.length > 0) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] == randomNumber) {
          hitDuplicate = 1;
          break;
        }
      }
      if (hitDuplicate == 1) {
        randomQuestion();
      } else {
        questionIndex = randomNumber;
        load();
        myArr.push(questionIndex);
      }
    }
    if (myArray.length == 0) {
      questionIndex = randomNumber;
      load();
      myArr.push(questionIndex);
    }
    myArray.push(questionIndex);
  }
}

//answer tracker - correct or wrong cicle. //

function answerTracker() {
  for (let i = 0; i < questions.length; i++) {
    const div = document.createElement("div"); //adding div to the class -answers-tracker based on the number of questions.
    answerTrackerContainer.appendChild(div);
  }
}

function updateAnswerTracker(classNam) {
  answerTrackerContainer.children[index - 1].classList.add(classNam); //
}

function quizOver() {
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML = questions.length;
  percentage.innerHTML = (score / questions.length) * 100 + "%";
}

function tryAgain() {
  window.location.reload();
}

// quiz pass//
function quizpass() {
  document.querySelector(".quiz-pass").classList.add("show");
  correctAnswerSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML = questions.length;
  percentage.innerHTML = (score / questions.length) * 100 + "%";
}

function tryNoMore() {
  window.location.reload();
}

window.onload = function () {
  randomQuestion();
  answerTracker();
};
