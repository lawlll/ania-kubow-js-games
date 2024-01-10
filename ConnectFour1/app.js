let rows = 6;
let cols = 7;
let currentPlayer = 1;
let gameOver = false;
let boardState = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function createBoard() {
  let game = document.querySelector("#game");
  let board = document.createElement("div");
  board.classList.add("board");
  game.appendChild(board);

  for (let i = 0; i < cols; i++) {
    let coldiv = addCols(board, i);
    for (let j = 0; j < rows; j++) {
      addCells(coldiv, j, i);
    }
  }
}

function addCols(board, col_index) {
  let col = document.createElement("div");
  col.classList.add("column");
  col.onclick = () => {
    clickColumn(col_index);
  };
  board.appendChild(col);
  return col;
}

function addCells(coldiv, row, col) {
  let cell = document.createElement("div");
  cell.className = "cell";
  cell.id = row + "_" + col;
  coldiv.appendChild(cell);
}

createBoard();

function setCellClass(row, col, className) {
  let cell = document.getElementById(row + "_" + col);
  cell.className = className;
}

function resetGame() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      boardState[i][j] = 0;
      setCellClass(i, j, "cell");
    }
  }
  gameOver = false;
  currentPlayer = 1;
  displayCurrentPlayer();
  hidePlayerDisplay(false);
  setStatus("");
}

function checkFullBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (boardState[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function setStatus(msg) {
  let statusTxt = document.getElementById("status");
  statusTxt.innerHTML = msg;
}


function checkBoundsAndFails(row, col, player){
  if (row < 0 || col < 0) return true;
  if (row >= rows || col >= cols) return true;
  if(boardState[row][col] !== player) return true;
  return false;
}

function checkContinuation(row, col, player, dx, dy){
  let prevRow;
  let prevCol;
  while(true){
    prevRow = row;    
    prevCol = col;
    row -= dx;
    col -= dy;

    if(checkBoundsAndFails(row, col, player)) break;
  }
  
  row = prevRow;
  col = prevCol;
  for(let i = 1 ; i < 4; i++){
    row += dx;
    col += dy;

    if(checkBoundsAndFails(row, col, player)) return false;
  }
  return true;
}

function checkPlayerWins(row, col, player) {
  if(checkContinuation(row, col, player, 0, 1)) return true;
  if(checkContinuation(row, col, player, 1, 0)) return true;
  if(checkContinuation(row, col, player, 1, 1)) return true;
  if(checkContinuation(row, col, player, -1, -1)) return true;
  return false;
}

function displayCurrentPlayer() {
  let currentPlayerDisplay = document.querySelector("#current-player");
  currentPlayerDisplay.innerHTML = `<p>player ${currentPlayer}</p>`;
  currentPlayerDisplay.className = "cell player" + currentPlayer;
}

function hidePlayerDisplay(signal){
  if(signal)
  document.querySelector('h3').style.display = 'none';
  else
  document.querySelector('h3').style.display = 'block';
}

function clickColumn(col) {
  if (gameOver) {
    resetGame();
    return;
  }

  let foundEmpty = false;
  for (let row = 5; row >= 0; row--) {
    if (boardState[row][col] === 0) {
      boardState[row][col] = currentPlayer;
      setCellClass(row, col, "cell player" + currentPlayer);
      foundEmpty = true;
      gameOver = checkPlayerWins(row, col, currentPlayer);
      break;
    }
  }
  if (!foundEmpty) {
    console.log("column is full cant add a disk here");
    return;
  }

  if (gameOver) {
    hidePlayerDisplay(true);
    setStatus("player " + currentPlayer + "won");
    return;
  }

  if (checkFullBoard()) {
    hidePlayerDisplay(true);
    setStatus(`its a tie<br>youre both winners`);
    gameOver = true;
    return;
  }

  currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);

  displayCurrentPlayer();
}
