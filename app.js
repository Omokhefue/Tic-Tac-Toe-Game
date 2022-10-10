const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("#board");
const restartBtn = document.querySelector("#restart-button");
const wiiningMessageElement = document.querySelector("#winningMessage");
const winningMesaggeText = document.querySelector(
  "[data-winning-message-text]"
);
const playerX = "x";
const playerCircle = "circle";
let circleTurn;
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
restartBtn.addEventListener("click", startGame);
startGame();
function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(playerCircle);
    cell.classList.remove(playerX);
    wiiningMessageElement.classList.remove("active");
    cell.addEventListener("click", handleClick, { once: true });
  });
}
function handleClick(e) {
  cell = e.target;
  const curentPlayer = circleTurn ? playerCircle : playerX;
  placeMark(cell, curentPlayer);
  if (isWinner(curentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns(cell);
    setBoardHoverClass();
  }
}
function setBoardHoverClass() {
  board.classList.remove(playerX);
  board.classList.remove(playerCircle);
  if (circleTurn) {
    board.classList.add(playerCircle);
  } else {
    board.classList.add(playerX);
  }
}
function endGame(draw) {
  if (draw) {
    winningMesaggeText.textContent = "Draw!";
  } else {
    winningMesaggeText.textContent = `${circleTurn ? "o's" : "x's"} Win's`;
  }
  wiiningMessageElement.classList.add("active");
}
function isWinner(curentPlayer) {
  return winningCombination.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(curentPlayer);
    });
  });
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(playerCircle) || cell.classList.contains(playerX)
    );
  });
}
function placeMark(cell, curentPlayer) {
  cell.classList.add(curentPlayer);
}
function switchTurns(e) {
  let cell=e.target
  circleTurn = !circleTurn;
}
