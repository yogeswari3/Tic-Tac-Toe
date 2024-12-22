document.addEventListener("DOMContentLoaded", () => {
    const settings = JSON.parse(localStorage.getItem("ticTacToeSettings"));
    // const scores = JSON.parse(localStorage.getItem("scores")) || { player1Wins: 0, player2Wins: 0, draws: 0 };
    const history = JSON.parse(localStorage.getItem("gameHistory")) || [];

    // Update stats
    // document.getElementById("player1-name").textContent = settings.player1Name;
    // document.getElementById("player2-name").textContent = settings.player2Name;
    // document.getElementById("matches-played").textContent = history.length;
    // document.getElementById("player1-wins").textContent = scores.player1Wins;
    // document.getElementById("player2-wins").textContent = scores.player2Wins;
    // document.getElementById("draws").textContent = scores.draws;

    const lastGameResultElement = document.getElementById("last-game-result");
    if (history.length > 0) {
        const lastGame = history[history.length - 1];
        lastGameResultElement.textContent = lastGame.matchResult || "No result available.";
    } else {
        lastGameResultElement.textContent = "No games played yet.";
    }


    const historyBody = document.getElementById("history-body");
    history.forEach((game, index) => {
        const { matchResult, player1, player2 } = game;

        // Create a new row
        const row = document.createElement("tr");

        // Match Number
        const matchCell = document.createElement("td");
        matchCell.textContent = `Match ${index + 1}`;
        row.appendChild(matchCell);

        // Players
        const playersCell = document.createElement("td");
        playersCell.textContent = `${player1} vs ${player2}`;
        row.appendChild(playersCell);

        // Result
        const resultCell = document.createElement("td");
        resultCell.textContent = matchResult;
        row.appendChild(resultCell);

        // Append row to table body
        historyBody.appendChild(row);
    });

    // Buttons
    document.getElementById("play-again").addEventListener("click", () => {
        window.location.href = "settings.html"; // Redirect to settings page
    });

    document.getElementById("go-home").addEventListener("click", () => {
        window.location.href = "index.html"; // Redirect to home page
    });
});
