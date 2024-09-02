document.addEventListener('DOMContentLoaded', function() {
    const boardElement = document.getElementById('sudoku-board');
    const solveButton = document.getElementById('solve-button');
    const resetButton = document.getElementById('reset-button');
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    document.querySelector('.container').appendChild(errorMessage);
    let board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    function createBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cell = document.createElement('input');
                cell.type = 'text';
                cell.maxLength = 1;
                cell.classList.add('cell');
                if (board[i][j] !== 0) {
                    cell.value = board[i][j];
                    cell.disabled = true;
                } else {
                    cell.addEventListener('input', function() {
                        handleInput(cell, i, j);
                    });
                }
                boardElement.appendChild(cell);
            }
        }
    }

    function handleInput(cell, row, col) {
        const value = parseInt(cell.value);
        if (isNaN(value) || value < 1 || value > 9 || !isValid(board, value, row, col)) {
            cell.classList.add('invalid');
            showErrorMessage('Invalid entry!');
        } else {
            cell.classList.remove('invalid');
            hideErrorMessage();
            board[row][col] = value;
        }
    }

    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideErrorMessage() {
        errorMessage.style.display = 'none';
    }

    function solveSudoku() {
        if (solve(board)) {
            updateBoard();
        } else {
            alert('No solution exists!');
        }
    }

    function updateBoard() {
        const cells = document.querySelectorAll('.cell');
        let index = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells[index].value = board[i][j];
                cells[index].classList.remove('invalid');
                index++;
            }
        }
    }

    function resetBoard() {
        board = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        createBoard();
        hideErrorMessage();
    }

    function solve(board) {
        let emptyCell = findEmptyCell(board);
        if (!emptyCell) {
            return true;
        }

        let row = emptyCell[0];
        let col = emptyCell[1];

        for (let num = 1; num <= 9; num++) {
            if (isValid(board, num, row, col)) {
                board[row][col] = num;
                if (solve(board)) {
                    return true;
                }
                board[row][col] = 0;
            }
        }

        return false;
    }

    function findEmptyCell(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    function isValid(board, num, row, col) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        let startRow = Math.floor(row / 3) * 3;
        let startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    solveButton.addEventListener('click', solveSudoku);
    resetButton.addEventListener('click', resetBoard);

    createBoard();
});
