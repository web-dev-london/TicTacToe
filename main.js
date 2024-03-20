const gameCells = [
  ...document.querySelectorAll('.game__cell'),
];
const gameStatus = document.querySelector(
  '#game__status',
);
const btnRestart = document.querySelector(
  '#game__restart',
);

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

function initializeGame() {
  gameCells.forEach((cell) =>
    cell.addEventListener('click', cellClicked),
  );
  btnRestart.addEventListener('click', restartGame);
  gameStatus.textContent = `${currentPlayer}'s turn`;
  running = true;
}
initializeGame();

function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');
  if (options[cellIndex] !== '' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    gameStatus.textContent = `${currentPlayer} win!`;
    running = false;
  } else if (!options.includes('')) {
    gameStatus.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  gameStatus.textContent = `${currentPlayer}'s turn`;
  gameCells.forEach((cell) => (cell.textContent = ''));
  running = true;
}
