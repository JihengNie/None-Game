var $formSelector = document.querySelector('.question-form');
var $question = document.querySelector('.question');
var $resetButton = document.querySelector('.reset-button');
var $hintsButton = document.querySelector('.hint-button');
var $hintText = document.querySelector('.hints');
var $hintCloseButton = document.querySelector('.close-hints');
var $hintContainer = document.querySelector('.modal-background-container');
var $attemptTracker = document.querySelector('.attempt-tracker');
var previousQuestionNumber = localStorage.getItem('None-Question-Number-local-storage');
var previousUserAttempts = localStorage.getItem('None-Question-Attempts-local-storage');
var counter = 0;
var attempts = 0;

window.addEventListener('beforeunload', storingQuestionNumber);
$formSelector.addEventListener('submit', formSubmited);
$resetButton.addEventListener('click', resetGame);
$hintsButton.addEventListener('click', givingHints);
$hintCloseButton.addEventListener('click', closingHints);

if (previousQuestionNumber) {
  counter = JSON.parse(previousQuestionNumber);
  attempts = JSON.parse(previousUserAttempts);
  $question.textContent = allQuestions[counter].question;
  $attemptTracker.textContent = 'Count: ' + attempts;
}

function closingHints(event) {
  $hintContainer.className = 'modal-background-container hidden';
}

function givingHints(event) {
  $hintText.textContent = allQuestions[counter].hint;
  $hintContainer.className = 'modal-background-container';
}

function resetGame(event) {
  counter = 0;
  $question.textContent = allQuestions[counter].question;
}

function formSubmited(event) {
  event.preventDefault();
  attempts++;
  $attemptTracker.textContent = 'Count: ' + attempts;
  if (checkIfInArray(formatComparision($formSelector.elements.input.value), allQuestions[counter].answer)) {
    counter++;
    if (counter === allQuestions.length) {
      $question.textContent = 'Game Over';
    } else {
      $question.textContent = allQuestions[counter].question;
    }
  }
  $formSelector.reset();
}

function storingQuestionNumber(event) {
  var questionNumber = JSON.stringify(counter);
  localStorage.setItem('None-Question-Number-local-storage', questionNumber);
  var previousUserAttempts = JSON.stringify(attempts);
  localStorage.setItem('None-Question-Attempts-local-storage', previousUserAttempts);
}

function removeSpaces(string) {
  var result = '';
  for (var i = 0; i < string.length; i++) {
    if (string[i] !== ' ') {
      result += string[i];
    }
  }
  return result;
}

function checkIfInArray(item, array) {
  for (var i = 0; i < array.length; i++) {
    if (item === array[i].toLocaleLowerCase()) {
      return true;
    }
  }
  return false;
}

function formatComparision(input) {
  input = removeSpaces(input.toLocaleLowerCase());
  return input;
}
