const grid = document.querySelector('.grid');
const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#start-pause-button');
const reloadBtn = document.querySelector('#reload-button');


const squares = document.querySelectorAll('.grid div');
let currentPosition = 76;
const width = 9;

const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

let timerID;
let outcomeTimerID;
let timeLeft = 20;

function moveFrog(e) {
  squares[currentPosition].classList.remove('frog');
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition % width !== 0) {
        currentPosition -= 1;
      }
      break;
    case 'ArrowRight':
      if (currentPosition % width < width - 1) {
        currentPosition += 1;
      }
      break;
    case 'ArrowUp':
      if (currentPosition - width >= 0) {
        currentPosition -= width;
      }
      break;
    case 'ArrowDown':
      if (currentPosition + width < width * width) {
        currentPosition += width;
      }
      break;
  }
  squares[currentPosition].classList.add('frog');
}

// document.addEventListener('keyup', moveFrog);

function automoveElements() {
    timeLeft--;
    timeLeftDisplay.textContent = `${timeLeft}` ;
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}

function checkForOutcomes(){
    checkForLoss();
    checkForwin();
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1');
      logLeft.classList.add('l2');
      return;
    case logLeft.classList.contains('l2'):
      logLeft.classList.remove('l2');
      logLeft.classList.add('l3');
      return;
    case logLeft.classList.contains('l3'):
      logLeft.classList.remove('l3');
      logLeft.classList.add('l4');
      return;
    case logLeft.classList.contains('l4'):
      logLeft.classList.remove('l4');
      logLeft.classList.add('l5');
      return;
    case logLeft.classList.contains('l5'):
      logLeft.classList.remove('l5');
      logLeft.classList.add('l1');
      return;
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1');
      logRight.classList.add('l5');
      return;
    case logRight.classList.contains('l2'):
      logRight.classList.remove('l2');
      logRight.classList.add('l1');
      return;
    case logRight.classList.contains('l3'):
      logRight.classList.remove('l3');
      logRight.classList.add('l2');
      return;
    case logRight.classList.contains('l4'):
      logRight.classList.remove('l4');
      logRight.classList.add('l3');
      return;
    case logRight.classList.contains('l5'):
      logRight.classList.remove('l5');
      logRight.classList.add('l4');
      return;
  }
}

function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains('c1'):
      carLeft.classList.remove('c1');
      carLeft.classList.add('c2');
      return;
    case carLeft.classList.contains('c2'):
      carLeft.classList.remove('c2');
      carLeft.classList.add('c3');
      return;
    case carLeft.classList.contains('c3'):
      carLeft.classList.remove('c3');
      carLeft.classList.add('c1');
      return;
  }
}
function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1');
      carRight.classList.add('c3');
      return;
    case carRight.classList.contains('c2'):
      carRight.classList.remove('c2');
      carRight.classList.add('c1');
      return;
    case carRight.classList.contains('c3'):
      carRight.classList.remove('c3');
      carRight.classList.add('c2');
      return;
  }
}
function checkForLoss(){
    if(
        (squares[currentPosition].classList.contains('c1')) ||
        (squares[currentPosition].classList.contains('l4')) ||
        (squares[currentPosition].classList.contains('l5')) ||
        timeLeft === 0
    ){
        resultDisplay.innerHTML = 'you lost';
        clearInterval(timerID);
        clearInterval(outcomeTimerID);
        squares[currentPosition].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
        startPauseBtn.removeEventListener('click', startPauseGame);
    }
}

function checkForwin(){
    if(squares[currentPosition].classList.contains('ending-block')){
        resultDisplay.innerHTML = `conratulations<br>you won`;
        clearInterval(timerID);
        clearInterval(outcomeTimerID);
        document.removeEventListener('keyup', moveFrog);
        startPauseBtn.removeEventListener('click', startPauseGame);
    }
}
// timerID = setInterval(automoveElements, 1000);
// outcomeTimerID = setInterval(checkForOutcomes, 50);

function startPauseGame(){
    if(timerID){
        clearInterval(timerID);
        clearInterval(outcomeTimerID);
        timerID = null;
        document.removeEventListener('keyup', moveFrog);
    }
    else{
        timerID = setInterval(automoveElements, 1000);
        outcomeTimerID = setInterval(checkForOutcomes, 50);
        document.addEventListener('keyup', moveFrog);
    }
}
startPauseBtn.addEventListener('click', startPauseGame);
reloadBtn.addEventListener('click', ()=>{
    location.reload(true);
    // console.log(location.href)
})