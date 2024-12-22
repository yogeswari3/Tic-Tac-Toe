document.addEventListener("DOMContentLoaded", () => {
    const modeSelector = document.getElementById("mode");
    const player2Container = document.getElementById("player2-container");

    // Ensure 1 Player is selected by default
    modeSelector.value = "1"; // Set the default mode to "1 Player"
    player2Container.style.display = "none"; // Hide Player 2 container by default

    modeSelector.addEventListener("change", () => {
        if (modeSelector.value === "2") {
            player2Container.style.display = "block";
        } else {
            player2Container.style.display = "none";
        }
    });

    const form = document.getElementById("settings-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const gridSize = document.getElementById("grid-size").value;
        const theme = document.getElementById("theme").value;
        const mode = document.getElementById("mode").value;
        const player1Name = document.getElementById("player1-name").value;
        const player2Name = document.getElementById("player2-name").value;

        // Save settings to localStorage for now
        const settings = {
            gridSize,
            theme,
            mode,
            player1Name,
            player2Name: mode === "2" ? player2Name : "AI",
        };
        localStorage.setItem("ticTacToeSettings", JSON.stringify(settings));

        // Redirect to game page
        window.location.href = "game.html";
    });
});
