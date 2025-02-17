const container = document.querySelector(".container");
container.style.display = "grid";
container.style.height = "100vh";
const content = document.createElement("div");
let sizeX = 0;
let sizeY = 0;
//todo: let there be 3 difficulty levels
let size = prompt("Enter row width-Must be even (Eg: 16):"); //todo: add check for even input
for (sizeX = 0; sizeX < size; sizeX++) {
  for (sizeY = 0; sizeY < size; sizeY++) {
    const content = document.createElement("div");
    content.setAttribute("id", `${sizeY}-${sizeX}`);
    content.classList.add("content");
    content.setAttribute(
      "style",
      "opacity: 0; transition: 0.2s ease; background:yellow;"
    );
    content.style.gridColumnStart = sizeX + 1;
    content.style.gridRowStart = sizeY + 1;
    content.addEventListener("click", () => {
      content.style.opacity = 1;
    });
    container.appendChild(content);
  }
}
populateGrid(container);

const clear = document.querySelectorAll(".content");
const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  for (const content of clear) {
    content.style.opacity = 0;
  }
});

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
  const maxNum = size / 2;
  for (let i = 1; i <= maxNum; i++) {
    populateCell(container, i);
    populateCell(container, i);
  }
}
