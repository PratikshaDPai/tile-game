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
let maxNum = 0;
let choice1 = 0;
let choice2 = 0;
let id1;
let id2;
let score = 0;
let isBoardLocked = false;
const scoreElement = document.getElementById("score");
const difficulty = document.querySelector(".difficulty-modal");
const pastelColorPallette = [
  "#f4c9a4",
  "#fbc4ab",
  "#f9a8b2",
  "#dba3c8",
  "#b38dc0",
];
const deepColorPallette = [
  "#eeaf61",
  "#fb9062",
  "#ee5d6c",
  "#ce4993",
  "#6a0d83",
];
const colorPallette = ["#eeaf61", "#fba57f", "#f1838f", "#d478ab", "#9141a2"];

//todo: let there be 3 difficulty levels
let width = 1;
easy.addEventListener("click", function (event) {
  width = 4;
  difficulty.classList.add("unset");
  startGame();
});
medium.addEventListener("click", function (event) {
  width = 6;
  difficulty.classList.add("unset");
  startGame();
});
hard.addEventListener("click", function (event) {
  width = 8;
  difficulty.classList.add("unset");
  startGame();
});
newGame.addEventListener("click", function (event) {
  container.textContent = "";
  body.style.flexDirection = "row";
  difficulty.classList.remove("unset");
});
function startGame() {
  eraseBoard();
  score = 0;
  for (let sizeX = 0; sizeX < width; sizeX++) {
    for (let sizeY = 0; sizeY < width; sizeY++) {
      const content = document.createElement("div");
      content.setAttribute("id", `cell-${sizeY}-${sizeX}`);
      content.classList.add("content");
      content.setAttribute(
        "style",
        `color: transparent; opacity:0.5; transition: 0.2s ease; background:${startColor};`
      );

      content.style.gridColumnStart = sizeX + 1;
      content.style.gridRowStart = sizeY + 1;
      content.addEventListener("click", () => {
        if (content.style.backgroundColor !== startColor) {
          console.log(`Choice.Invalid`, { reason: "Cell is already complete" });
          return;
        }
        if (isBoardLocked) {
          console.log(`Choice.Invalid`, { reason: "Board is locked" });
          return;
        }
        if (choice1 === 0) {
          choice1 = Number(content.innerText);
          console.log(`Choice1.Change`, { choice1 });
          id1 = content.id;
          console.log(`Id1.Change`, { id1 });
        } else {
          choice2 = Number(content.innerText);
          console.log(`Choice2.Change`, { choice2 });
          id2 = content.id;
          console.log(`Id2.Change`, { id2 });
          if (choice1 === choice2) {
            if (id1 === id2) {
              console.log(`Choice.Invalid`, {
                reason: "Cannot click on the same cell twice",
              });
              return;
            }
            const color =
              colorPallette[Math.floor(Math.random() * colorPallette.length)];
            console.log(`Choice.Successful`, { choice: choice1, color });
            content.style.backgroundColor = color;
            document.querySelector(`#${id1}`).style.backgroundColor = color;
            score++;
            scoreElement.textContent = score;
            console.log(`Score.Update`, { score });
            if (score === maxNum) {
              console.log(`Score.Win`, { score });
              body.style.flexDirection = "column";
              setTimeout(() => {
                eraseBoard();
                generateGradient();

                container.textContent = getRandomQuote();
              }, 100);
            }
          } else {
            // copy choices since they may get overwritten before 1 sec finishes
            const choice1Copy = choice1;
            const choice2Copy = choice2;
            isBoardLocked = true;
            setTimeout(() => {
              console.log(`Choice.Unsuccessful`, {
                choice1: choice1Copy,
                choice2: choice2Copy,
              });
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

  console.log(`Board.Erase`);
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

  console.log(`Board.Populate`);
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
