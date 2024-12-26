let randomNumber = Math.floor(Math.random()*100 +1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');


let prevGuess = [];
let numGuess=1;

submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });

  function validateGuess(guess) {
    if (isNaN(guess)) {
      alert('Please enter a valid number');
    } else if (guess < 1) {
      alert('Please enter a number more than 1');
    } else if (guess > 100) {
      alert('Please enter a  number less than 100');
    } else {
      displayGuess(guess);
      if(numGuess==11 ){
        if( guess != randomNumber) displayMessage(`Game Over. Random number was ${randomNumber}`);
        else displayMessage(`You guessed it right`);
        endGame();
    }else     
      checkGuess(guess);
    }
  }

  function checkGuess(guess) {
    if (guess === randomNumber) {
      displayMessage(`You guessed it right`);
      endGame();
    } else if (guess < randomNumber) {
      displayMessage(`Number is TOOO low`);
    } else if (guess > randomNumber) {
      displayMessage(`Number is TOOO High`);
    }
  }

  function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    remaining.innerHTML = `${10 - numGuess} `;
    numGuess++;
  }
  
  function displayMessage(message) {
    lowOrHi.innerHTML = `<h4>${message}</h4>`;
  }

  //see dom lecturer program 3 and 4 is main
  function createNewElement(){
    const strGame = document.createElement('div'); //created a paragrpaoh tag
    strGame.setAttribute("class", "newGamebtn");
    // strGame.classList.add('newGamebtn'); // or do this both above and this is totally same
    strGame.innerHTML =`<button type="submit" id ="playGame">Start New Game </button>`;
return strGame;
  }
  
function endGame(){
    userInput.value = '';
    // userInput.setAttribute('disabled', '');
    // userInput.disabled =true; // or we can do this also 
    const newElm =createNewElement();
  startOver.appendChild(newElm);
  newGame();
}


function newGame() {
  const newGameButton = document.querySelector('#playGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = 10;
    lowOrHi.innerHTML=''
    userInput.removeAttribute('disabled');
    // userInput.disabled = false; // we can do also 
    startOver.removeChild(document.querySelector('.newGamebtn'));

  });
}
