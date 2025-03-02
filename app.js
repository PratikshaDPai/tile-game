"use strict";
import quotes from "./quotes.js";

const body = document.querySelector("body");
const container = document.querySelector(".container");
const startColor = "salmon";
container.style.display = "grid";
const content = document.createElement("div");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const newGame = document.querySelector("#new-game");
const soundButton = document.querySelector(".sound-button");
let maxNum = 0;
let choice1 = 0;
let choice2 = 0;
let id1;
let id2;
let score = 0;
let moves = 0;
let isBoardLocked = false;
const scoreElement = document.getElementById("score");
const difficulty = document.querySelector(".difficulty-modal");
const bubblePop = new Audio("./assets/bubblepop.mp3");
const backgroundMusic = new Audio("./assets/soft-piano-keys.mp3");
backgroundMusic.loop = true; // Enable looping
backgroundMusic.volume = 0.5;

const colorPallette = ["#eeaf61", "#fba57f", "#f1838f", "#d478ab", "#9141a2"];
const tileColorPalette = ["#fba57f", "#f1838f", "#d478ab", "#be7cc3"];
let width = 1;
let isSoundOn = true;

soundButton.addEventListener("click", function (event) {
  if (isSoundOn) {
    backgroundMusic.play();
    soundButton.innerText = "🔊";
  } else {
    backgroundMusic.pause();
    soundButton.innerText = "🔇";
  }
  isSoundOn = !isSoundOn;
});
easy.addEventListener("click", function (event) {
  width = 4;
  difficulty.classList.add("unset");
  renderBoard();
});
medium.addEventListener("click", function (event) {
  width = 6;
  difficulty.classList.add("unset");
  renderBoard();
});
hard.addEventListener("click", function (event) {
  width = 8;
  difficulty.classList.add("unset");
  renderBoard();
});
newGame.addEventListener("click", function (event) {
  startGame();
});

function startGame() {
  container.textContent = "";
  body.style.flexDirection = "";
  score = 0;
  moves = 0;
  scoreElement.innerText = 0;
  body.style.background = "linear-gradient(120deg, #fbc4ab, #ff9a8b)";
  difficulty.classList.remove("unset");
}

function renderBoard() {
  backgroundMusic.play();
  eraseBoard();
  for (let sizeX = 0; sizeX < width; sizeX++) {
    for (let sizeY = 0; sizeY < width; sizeY++) {
      const content = document.createElement("div");
      content.setAttribute("id", `cell-${sizeY}-${sizeX}`);
      content.classList.add("content");
      content.setAttribute(
        "style",
        `color: transparent; opacity:0.5; transition: 0.2s ease; background:${startColor};`
      );
      if (width == 4) {
        content.style.fontSize = "32px";
      }

      content.style.gridColumnStart = sizeX + 1;
      content.style.gridRowStart = sizeY + 1;
      content.addEventListener("click", () => {
        if (content.style.backgroundColor !== startColor) {
          return;
        }
        if (isBoardLocked) {
          return;
        }
        bubblePop.load();
        bubblePop.play();
        if (choice1 === 0) {
          choice1 = Number(content.innerText);

          id1 = content.id;
        } else {
          choice2 = Number(content.innerText);

          id2 = content.id;
          moves++;
          scoreElement.textContent = moves;
          if (choice1 === choice2) {
            if (id1 === id2) {
              return;
            }
            const color =
              tileColorPalette[
                Math.floor(Math.random() * tileColorPalette.length)
              ];

            content.style.backgroundColor = color;
            document.querySelector(`#${id1}`).style.backgroundColor = color;
            score++;

            if (score === maxNum) {
              body.style.flexDirection = "column";

              eraseBoard();
              generateGradient();

              container.textContent = getRandomQuote();
            }
          } else {
            // copy choices since they may get overwritten before 1 sec finishes
            const choice1Copy = choice1;
            const choice2Copy = choice2;
            isBoardLocked = true;
            setTimeout(() => {
              content.style.color = "antiquewhite";
              content.style.opacity = 0.5;
              content.style.color = "transparent";
              document.querySelector(`#${id1}`).style.opacity = 0.5;
              document.querySelector(`#${id1}`).style.color = "transparent";

              isBoardLocked = false;
            }, 500);
          }

          choice1 = 0;
          choice2 = 0;
        }
        content.style.color = "antiquewhite";
        content.style.opacity = 1;
      });
      container.appendChild(content);
    }
  }
  populateGrid(container);
}

function eraseBoard() {
  container.textContent = "";
}

function populateCell(container, number) {
  const size = container.children.length;
  const index = Math.floor(Math.random() * size);
  const cell = container.children[index];
  if (cell.innerText === "") {
    cell.innerText = number;
  } else {
    populateCell(container, number);
  }
}

function populateGrid(container) {
  const size = container.children.length;
  maxNum = size / 2;
  for (let i = 1; i <= maxNum; i++) {
    populateCell(container, i);
    populateCell(container, i);
  }
}

function getRandomQuote() {
  const data = quotes[Math.floor(Math.random() * quotes.length)];
  return `"${data.quote}" — ${data.author}`;
}

function generateGradient() {
  // Join the colors into a gradient string
  const gradient = `linear-gradient(45deg, ${colorPallette
    .reverse()
    .join(", ")})`;

  // Apply the gradient as the background
  document.body.style.background = gradient;
}
