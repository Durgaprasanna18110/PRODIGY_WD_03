const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', '']; // To track the game state

// Function to check for a winner
const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }

  return gameState.includes('') ? null : 'draw'; // Check for draw
};

// Function to handle cell click
const handleCellClick = (index) => {
  if (gameState[index] === '') {
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer); // Add class X or O
    const result = checkWinner();

    if (result === 'X' || result === 'O') {
      statusText.textContent = `${result} wins!`;
      statusText.classList.add('win');
      return;
    } else if (result === 'draw') {
      statusText.textContent = "It's a draw!";
      statusText.classList.add('draw');
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
};

// Event listener for each cell
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    handleCellClick(index);
  });
});

// Reset the game
resetButton.addEventListener('click', () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O'); // Remove any X/O classes
  });
  currentPlayer = 'X';
  statusText.textContent = `Player X's turn`;
  statusText.classList.remove('win', 'draw');
});
