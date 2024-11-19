let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    // Set up the grid in HTML
    for (let i = 0; i < 9; i++) { // i goes from 0 to 8, stops at 9
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); // 1000 milliseconds = 1 second, every 1 second call setMole
    setInterval(setPlant, 2000); // 2000 milliseconds = 2 seconds, every 2 seconds call setPlant
}

function getRandomTile() {
    // Generate a random tile ID
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    mole.classList.add("brightness");

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    plant.classList.add("brightness");

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); // Update score HTML
    } else if (this == currPlantTile) {
        gameOver = true;
        document.getElementById("game-over-text").innerText = "GAME OVER: " + score;
        document.getElementById("game-over-modal").classList.remove("hidden");
    }
}

// Restart game logic
document.getElementById("restart-button").addEventListener("click", function () {
    score = 0;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;
    document.getElementById("score").innerText = score.toString();
    document.getElementById("game-over-modal").classList.add("hidden");

    // Clear all tiles
    let tiles = document.querySelectorAll("#board div");
    tiles.forEach(tile => tile.innerHTML = "");
});
