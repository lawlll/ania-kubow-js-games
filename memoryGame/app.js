const cardArray = [
  {
    name: "cheeseburger",
    img: "./images/cheeseburger.png",
  },
  {
    name: "fries",
    img: "./images/fries.png",
  },
  {
    name: "hotdog",
    img: "./images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "./images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "./images/milkshake.png",
  },
  {
    name: "pizza",
    img: "./images/pizza.png",
  },
  {
    name: "cheeseburger",
    img: "./images/cheeseburger.png",
  },
  {
    name: "fries",
    img: "./images/fries.png",
  },
  {
    name: "hotdog",
    img: "./images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "./images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "./images/milkshake.png",
  },
  {
    name: "pizza",
    img: "./images/pizza.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];
const resultDisplay = document.querySelector('#result');

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}

createBoard();

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  console.log("clicked ", cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 200);
    // checkMatch(); // second tile dosent flip
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("img");

  if (cardsChosenIds[0] === cardsChosenIds [1]){
    alert('oops! you selected the same tile twice');
    cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
  }
  else if (cardsChosen[0] === cardsChosen[1]) {
    alert("its a match");
    cards[cardsChosenIds[0]].setAttribute("src", "images/white.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/white.png");
    cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
    console.log(cardsWon);
  } else {
    cards[cardsChosenIds[0]].setAttribute("src", "images/blank.png");
    cards[cardsChosenIds[1]].setAttribute("src", "images/blank.png");
    alert('sorry try again');
  }

  resultDisplay.textContent = cardsWon.length;

  if(cardsWon.length === cardArray.length/2){
    resultDisplay.textContent = `Congratulations! You got em all!`
  }
  cardsChosen = [];
  cardsChosenIds = [];
}
