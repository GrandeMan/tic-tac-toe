//Gameboard
const gameBoard = (() =>{
    const board = ['','','','','','','','',''];
    
    const getBoard = () => board;

    const markCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };

    return {getBoard, markCell};
})();

//Player
const Player = (name, marker) => {
    return {name, marker};
};

//Display Controller
const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const messageDiv = document.getElementById('message');

    const renderGameBoard = () => {
        const board = gameBoard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const displayMessage = (message) => {
        messageDiv.textContent = message;
    };

    const resetBoard = () => {
        cells.forEach((cell) => {
            cell.textContent = '';
        });
        messageDiv.textContent = '';
    };

    return {renderGameBoard, displayMessage, resetBoard};
})();

const game = (() => {
    let currentPlayer;
    let player1;
    let player2;

    const cells = document.querySelectorAll('.cell');

    const cellClickHandler = (cell) => {
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
        if (!cell.textContent) {
            const cellMarked = gameBoard.markCell(cellIndex, currentPlayer.marker);
            if (cellMarked) {
                displayController.renderGameBoard();
                if (checkWin(currentPlayer)) {
                    displayController.displayMessage(`${currentPlayer.name} wins!`);
                    cells.forEach((cell) => {
                        cell.removeEventListener('click', cellClickHandler);
                    });
                } else if (checkTie()) {
                    displayController.displayMessage("It's a tie!");
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1; // toggle between player1 and player2 after each move
                    displayController.displayMessage(`${currentPlayer.name}'s turn`);
                }
            }
        }

    };

    const startGame = () => {
        const player1Name = document.getElementById('player1').value || 'Player 1';
        const player2Name = document.getElementById('player2').value || 'Player 2';

        player1 = Player(player1Name, 'X');
        player2 = Player(player2Name, 'O');

        currentPlayer = player1;

        cells.forEach((cell) => {
            cell.addEventListener('click', () => cellClickHandler(cell));
        });

        displayController.displayMessage(`${currentPlayer.name}'s turn`);
    };

    const checkWin = (player) => {
        const board = gameBoard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
            [0, 4, 8], [2, 4, 6] //Diagonals
        ];

        for (let pattern of winPatterns) {
            if (
                board[pattern[0]] === player.marker &&
                board[pattern[1]] === player.marker &&
                board[pattern[2]] === player.marker
            ) {
                return true;
            }
        }
        return false;
    };

    const checkTie = () => {
        const board = gameBoard.getBoard();
        return board.every((cell) => cell !== '');
    };

    return {startGame};
})();

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', () => {
        game.startGame();
    });

    displayController.resetBoard();
});
