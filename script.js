document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('game-board');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const currentPlayerDisplay = document.getElementById('current-player');
    const newGameButton = document.getElementById('new-game-button');
    const restartButton = document.getElementById('restart-button');
    const newGameResultButton = document.getElementById('new-game-result-button');

    let currentPlayer = 'X';
    const cells = [];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        cells.push(cell);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const cell = event.target;
        if (cell.textContent === '') {
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                showResultScreen('Player ' + currentPlayer + ' wins!');
            } else if (checkDraw()) {
                showResultScreen('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                currentPlayerDisplay.textContent = currentPlayer;
            }
        }
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningConditions.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return cells.every(cell => cell.textContent !== '');
    }

    function showResultScreen(message) {
        resultMessage.textContent = message;
        resultScreen.classList.remove('hidden');
    }

    function hideResultScreen() {
        resultScreen.classList.add('hidden');
    }

    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        currentPlayerDisplay.textContent = currentPlayer;
    }

    newGameButton.addEventListener('click', function() {
        hideResultScreen();
        resetBoard();
    });

    restartButton.addEventListener('click', function() {
        hideResultScreen();
        resetBoard();
    });

    newGameResultButton.addEventListener('click', function() {
        hideResultScreen();
        resetBoard();
    });
});