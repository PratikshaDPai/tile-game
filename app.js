"use strict";
const container = document.querySelector(".container");
container.style.display = "grid";
container.style.height = "100vh";
const content = document.createElement("div");
let maxNum = 0;
let choice1 = 0;
let choice2 = 0;
let id1;
let id2;
let score = 0;
let isBoardLocked = false;
const scoreElement = document.getElementById("score");
//todo: let there be 3 difficulty levels
let width = 1;
while (width % 2 !== 0) {
  width = prompt("Enter row width-Must be even (Eg: 16):");
  console.log(`Width.Update`, { width });
}
for (let sizeX = 0; sizeX < width; sizeX++) {
  for (let sizeY = 0; sizeY < width; sizeY++) {
    const content = document.createElement("div");
    content.setAttribute("id", `cell-${sizeY}-${sizeX}`);
    content.classList.add("content");
    content.setAttribute(
      "style",
      "opacity: 0; transition: 0.2s ease; background:yellow;"
    );
    content.style.gridColumnStart = sizeX + 1;
    content.style.gridRowStart = sizeY + 1;
    content.addEventListener("click", () => {
      if (content.style.backgroundColor === "green") {
        console.log(`Choice.Invalid`, { reason: "Cell is already green" });
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
          console.log(`Choice.Successful`, { choice: choice1 });
          content.style.backgroundColor = "green";
          document.querySelector(`#${id1}`).style.backgroundColor = "green";
          score++;
          scoreElement.textContent = score;
          console.log(`Score.Update`, { score });
          if (score === maxNum) {
            console.log(`Score.Win`, { score });
            alert("YOU WON!");
            setTimeout(eraseBoard(), 1500);
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

            content.style.opacity = 0;
            document.querySelector(`#${id1}`).style.opacity = 0;

            isBoardLocked = false;
          }, 1000);
        }

        choice1 = 0;
        choice2 = 0;
      }

      content.style.opacity = 1;
    });
    container.appendChild(content);
  }
}
populateGrid(container);

function eraseBoard() {
  const grid = document.querySelectorAll(".content");
  for (const content of grid) {
    content.style.opacity = 0;
    content.innerText = "";
  }

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
