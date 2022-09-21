var $formSelector = document.querySelector('.question-form');
var $question = document.querySelector('.question');
var $resetButton = document.querySelector('.reset-button');
var $hintsButton = document.querySelector('.hint-button');
var $hintText = document.querySelector('.hints');
var $hintCloseButton = document.querySelector('.close-hints');
var $hintContainer = document.querySelector('.modal-background-container');
var previousQuestionNumber = localStorage.getItem('None-Question-Number-local-storage');
var counter = 0;

window.addEventListener('beforeunload', storingQuestionNumber);
$formSelector.addEventListener('submit', formSubmited);
$resetButton.addEventListener('click', resetGame);
$hintsButton.addEventListener('click', givingHints);
$hintCloseButton.addEventListener('click', closingHints);
if (previousQuestionNumber) {
  counter = JSON.parse(previousQuestionNumber);
  $question.textContent = questionArray[counter];
}

function closingHints(event) {
  $hintContainer.className = 'modal-background-container hidden';
}

function givingHints(event) {
  $hintText.textContent = hintsArray[counter];
  $hintContainer.className = 'modal-background-container';
}

function resetGame(event) {
  counter = 0;
  $question.textContent = questionArray[counter];
}

function formSubmited(event) {
  event.preventDefault();
  if (removeSpaces($formSelector.elements.input.value.toLocaleLowerCase()) === removeSpaces(answeArray[counter].toLocaleLowerCase())) {
    counter++;
    if (counter === questionArray.length) {
      $question.textContent = 'Game Over';
    } else {
      $question.textContent = questionArray[counter];
    }
  }
  $formSelector.reset();
}

function storingQuestionNumber(event) {
  var questionNumber = JSON.stringify(counter);
  localStorage.setItem('None-Question-Number-local-storage', questionNumber);
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
