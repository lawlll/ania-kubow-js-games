const grid = document.querySelector(".grid");
let currentShooterIndex = 202;
const width = 15;
let direction = 1;
let aliensRemoved = [];
let score = 0;

let goingRight = true;
let resultsDisplay = document.querySelector("#result");
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const invaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function drawInvaders() {
  for (let i = 0; i < invaders.length; i++) {
    if(!aliensRemoved.includes(i)){
        squares[invaders[i]].classList.add("invader");
    }
  }
}

function removeInvaders() {
  for (let i = 0; i < invaders.length; i++) {
    squares[invaders[i]].classList.remove("invader");
  }
}

drawInvaders();

squares[currentShooterIndex].classList.add("shooter");

function lockMovements(){
    clearInterval(invaderId);
    document.removeEventListener("keydown", shoot);
    document.removeEventListener("keydown", moveShooter);
}

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex--;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex++;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
  const leftEdge = invaders[0] % width === 0;
  const rightEdge = invaders[invaders.length - 1] % width === width - 1;
  removeInvaders();

  if (rightEdge && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width + 1;
    }
    direction = -1;
    goingRight = false;
  }
  if (leftEdge && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width - 1;
    }
    direction = 1;
    goingRight = true;
  }

  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += direction;
  }
  drawInvaders();

  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultsDisplay.innerHTML = "game over";
    lockMovements();
  }

  for (let i = 0; i < invaders.length; i++) {
    if (invaders[1] > squares.length) {
      resultsDisplay.innerHTML = "game over";
      lockMovements();
    }
  }

  if(invaders.length === aliensRemoved.length){
    resultsDisplay.innerHTML = 'you won';
    lockMovements();
  }

}

let invaderId = setInterval(moveInvaders, 600);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");

    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");
      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        300
      );
      clearInterval(laserId);

      const alienHit = invaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienHit);
      score++;
      result.innerHTML = score; 
          

    }
  }
  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);
