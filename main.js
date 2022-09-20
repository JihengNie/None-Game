var $formSelector = document.querySelector('.question-form');
var $question = document.querySelector('.question');
var $resetButton = document.querySelector('.reset-button');
var previousQuestionNumber = localStorage.getItem('None-Question-Number-local-storage');
var counter = 0;

window.addEventListener('beforeunload', storingQuestionNumber);
$formSelector.addEventListener('submit', formSubmited);
$resetButton.addEventListener('click', resetGame);

if (previousQuestionNumber) {
  counter = JSON.parse(previousQuestionNumber);
  $question.textContent = questionArray[counter];
}

function resetGame(event) {
  counter = 0;
  $question.textContent = questionArray[counter];
}

function formSubmited(event) {
  event.preventDefault();
  if ($formSelector.elements.input.value.toLocaleLowerCase() === answeArray[counter].toLocaleLowerCase()) {
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
