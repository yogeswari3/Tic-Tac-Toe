document.addEventListener("DOMContentLoaded", () => {
    const settings = JSON.parse(localStorage.getItem("ticTacToeSettings"));
    const gridSize = parseInt(settings.gridSize);
    const theme = settings.theme;
    const mode = settings.mode;
    const player1Name = settings.player1Name;
    const player2Name = settings.player2Name;

    const gameGrid = document.getElementById("game-grid");
    const currentPlayerDisplay = document.getElementById("current-player");
    const gameTitle = document.getElementById("game-title");
    const timerDisplay = document.createElement("div");
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.id = "reset-button";
    resetButton.style.marginTop = "10px";

    // Append timer and reset button
    document.getElementById("game-info-container").appendChild(timerDisplay);
    document.getElementById("game-info-container").appendChild(resetButton);

    let currentPlayer = "X";
    let board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    let movesCount = 0;
    let timerInterval;
    const turnTimeLimit = 10;

    // Apply theme
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Set player names
    currentPlayerDisplay.textContent = player1Name;

    // Generate grid
    gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", () => handleCellClick(i, j, cell));
            gameGrid.appendChild(cell);
        }
    }

    function handleCellClick(row, col, cell) {
        if (board[row][col] !== null) return;

        board[row][col] = currentPlayer;
        cell.textContent = currentPlayer;
        movesCount++;

        if (checkWin(row, col)) {
            const winnerName = currentPlayer === "X" ? player1Name : player2Name;
            alert(`${winnerName} wins!`);
            updateHistory(`${winnerName} won`);
            // updateScores();
            clearInterval(timerInterval);
            redirectToResults();
            return;
        }

        if (movesCount === gridSize * gridSize) {
            alert("It's a draw!");
            updateHistory("Draw");
            clearInterval(timerInterval);
            redirectToResults();
            return;
        }

        switchPlayer();

        if (mode === "1" && currentPlayer === "O") {
            makeAIMove();
        }
    }

    function makeAIMove() {
        let emptyCells = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (board[i][j] === null) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }

        const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleCellClick(randomMove.row, randomMove.col, gameGrid.children[randomMove.row * gridSize + randomMove.col]);
    }

    function checkWin(row, col) {
        // Check row
        if (board[row].every((cell) => cell === currentPlayer)) return true;

        // Check column
        if (board.every((row) => row[col] === currentPlayer)) return true;

        // Check diagonals
        if (row === col && board.every((_, i) => board[i][i] === currentPlayer)) return true;
        if (row + col === gridSize - 1 && board.every((_, i) => board[i][gridSize - 1 - i] === currentPlayer)) return true;

        return false;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentPlayerDisplay.textContent = currentPlayer === "X" ? player1Name : player2Name;
        resetTurnTimer();
    }

    function resetTurnTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = `Time Left: ${turnTimeLimit} seconds`;
        startTurnTimer();
    }

    function startTurnTimer() {
        let timeLeft = turnTimeLimit;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;

            if (timeLeft <= 0) {
                alert(`${currentPlayer === "X" ? player1Name : player2Name}'s time is up! Turn skipped.`);
                switchPlayer();
            }
        }, 1000);
    }

    function updateScores() {
        const scores = JSON.parse(localStorage.getItem("scores")) || { player1Wins: 0, player2Wins: 0, draws: 0 };
        if (movesCount === gridSize * gridSize) {
            scores.draws++;
        } else if (currentPlayer === "X") {
            scores.player1Wins++;
        } else {
            scores.player2Wins++;
        }
        localStorage.setItem("scores", JSON.stringify(scores));
    }

    function redirectToResults() {
        window.location.href = "results.html";
    }

    function updateHistory(result) {
        const history = JSON.parse(localStorage.getItem("gameHistory")) || [];
        const gameDetails = {
            matchResult: result,
            player1: settings.player1Name,
            player2: settings.player2Name,
        };
        history.push(gameDetails); // Add the current game's details
        localStorage.setItem("gameHistory", JSON.stringify(history));
    }
    

    resetButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        initializeGame();
    });

    function initializeGame() {
        currentPlayer = "X";
        board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
        movesCount = 0;
        gameGrid.innerHTML = '';
        gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement("div");
                cell.classList.add("grid-cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", () => handleCellClick(i, j, cell));
                gameGrid.appendChild(cell);
            }
        }
        resetTurnTimer();
    }

    initializeGame();
});
