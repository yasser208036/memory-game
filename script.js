let cards = document.querySelectorAll(".card"),
  wrong = document.querySelector(".wrong"),
  startButton = document.querySelector(".start"),
  playAgainButton = document.querySelector(".play-again"),
  tryAgainButton = document.querySelector(".try-again"),
  gameOver = document.querySelector(".game-over"),
  win = document.querySelector(".win"),
  container = document.querySelector(".container"),
  images = document.querySelectorAll(".back img"),
  name = document.querySelector(".name");

let tries = 0; // to control the number of tries
let values = []; // to compare between images
let checked = []; // to apply the actions on the card
let correct = [];

cards.forEach((card) => {
  card.onclick = () => {
    card.classList.add("flip");
    tries++;
    checked.push(card);
    let image = card.querySelector("img");
    values.push(image.getAttribute("src"));
    setTimeout(checkImage, 700);
  };
});

function startGame() {
  startButton.parentElement.style.display = "none";
  shuflleCard();
  correct = [];
  cards.forEach((card) => {
    card.classList.add("flip");
    container.style.pointerEvents = "none";
    setTimeout(() => {
      card.classList.remove("flip");
      container.style.pointerEvents = "auto";
    }, 3000);
  });
}

function checkImage() {
  if (tries >= 2 && values[0] !== values[1]) {
    checked[0].classList.remove("flip");
    checked[1].classList.remove("flip");
    values = [];
    checked = [];
    tries = 0;
    wrong.innerText++;
    if (wrong.innerText == 7) {
      gameOver.style.display = "flex";
      container.style.pointerEvents = "none";
    }
  } else if (tries >= 2 && values[0] == values[1]) {
    correct.push(...checked);
    values = [];
    checked = [];
    tries = 0;
    if (correct.length == 20) {
      win.style.display = "flex";
    }
  }
}

function shuflleCard() {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); // sort arry by random way
  images.forEach((image, i) => {
    image.setAttribute("src", `images/${arr[i]}.png`);
  });
}

function playAgain() {
  gameOver.style.display = "none";
  win.style.display = "none";
  wrong.innerText = 0;
  startGame();
}

startButton.addEventListener("click", () => {
  let massage = prompt("Please enter your name");
  massage == null || massage == ""
    ? (name.innerText = "Unknown")
    : (name.innerText = massage);
  startGame();
});
playAgainButton.addEventListener("click", playAgain);
tryAgainButton.addEventListener("click", playAgain);
